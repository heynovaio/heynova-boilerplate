import fs from "node:fs/promises";
import path from "node:path";

const OUT_PATH = path.join(process.cwd(), "public", "_redirects");
const ROUTING_JSON = path.join(process.cwd(), "src", "generated", "navigation-routing.json");

async function fileExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function getPrismicEndpoint() {
  if (process.env.PRISMIC_ENDPOINT) return process.env.PRISMIC_ENDPOINT;

  const smPath = path.join(process.cwd(), "slicemachine.config.json");
  if (!(await fileExists(smPath))) {
    throw new Error("Missing slicemachine.config.json and PRISMIC_ENDPOINT not set");
  }

  const sm = JSON.parse(await fs.readFile(smPath, "utf8"));
  const repo = String(sm.repositoryName || "").trim();
  if (!repo) throw new Error("Missing repositoryName in slicemachine.config.json");
  return `https://${repo}.cdn.prismic.io/api/v2`;
}

async function fetchJson(url, token) {
  const res = await fetch(url, {
    headers: token ? { Authorization: `Token ${token}` } : {},
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Fetch failed (${res.status}) for ${url}\n${text}`);
  }
  return res.json();
}

function normalizeLocale(s) {
  return String(s || "").trim().toLowerCase();
}

function isExternal(to) {
  return /^https?:\/\//i.test(String(to || ""));
}

function normalizePath(s) {
  return String(s || "").trim();
}

function ensurePrefixed(pathname, prefix) {
  const p = normalizePath(pathname);
  if (!p.startsWith("/")) return null;
  if (!prefix) return p;
  const pref = `/${prefix}`;
  const lower = p.toLowerCase();
  if (lower === pref || lower.startsWith(`${pref}/`)) return p;
  return `${pref}${p === "/" ? "" : p}`;
}

function normalizeRule(raw) {
  const from = normalizePath(raw?.redirect_from);
  const to = normalizePath(raw?.redirect_to);
  const enabled = raw?.enabled === undefined ? true : Boolean(raw.enabled);
  if (!enabled) return { ok: false, reason: "Disabled" };
  if (!from || !to) return { ok: false, reason: "Missing from/to" };
  if (!from.startsWith("/")) return { ok: false, reason: "`from` must start with /" };
  if (!(to.startsWith("/") || isExternal(to))) return { ok: false, reason: "`to` must be /path or http(s)://..." };
  const statusNum = Number(String(raw?.status ?? "301"));
  if (![200, 301, 302, 404].includes(statusNum)) {
    return { ok: false, reason: "Invalid status (200/301/302/404)" };
  }
  const force = Boolean(raw?.force);
  if (/\s/.test(from)) return { ok: false, reason: "`from` contains whitespace" };
  if (/\s/.test(to)) return { ok: false, reason: "`to` contains whitespace" };
  return { ok: true, value: { from, to, status: statusNum, force } };
}

async function readRouting() {
  if (!(await fileExists(ROUTING_JSON))) {
    throw new Error(`Missing ${ROUTING_JSON}. Run generate-navigation-routing.mjs first.`);
  }
  return JSON.parse(await fs.readFile(ROUTING_JSON, "utf8"));
}

async function fetchNavigationRulesDoc() {
  const endpoint = await getPrismicEndpoint();
  const token = process.env.PRISMIC_ACCESS_TOKEN;
  const api = await fetchJson(endpoint, token);
  const masterRef = api.refs?.find((r) => r.isMasterRef)?.ref;
  if (!masterRef) throw new Error("Could not find Prismic master ref");
  const action = api.forms?.everything?.action;
  if (!action) throw new Error("Prismic missing everything.action");
  const qUrl = new URL(action);
  qUrl.searchParams.set("ref", masterRef);
  qUrl.searchParams.set("q", '[[at(document.type,"navigation_rules")]]');
  qUrl.searchParams.set("pageSize", "1");
  const data = await fetchJson(qUrl.toString(), token);
  const doc = data.results?.[0];
  if (!doc) throw new Error('No singleton doc found for type "navigation_rules"');
  return doc;
}

function toLine(from, to, status, force) {
  return `${from}\t${to}\t${status}${force ? "!" : ""}`;
}

async function main() {
  const routing = await readRouting();
  const locales = routing.locales || [];
  const prefixByLocale = routing.prefixByLocale || {};
  const doc = await fetchNavigationRulesDoc();
  const rules = doc.data?.redirect_rules;
  if (!Array.isArray(rules)) {
    throw new Error("navigation_rules.redirect_rules[] must be a Group field");
  }
  const lines = [];
  let skipped = 0;
  for (let i = 0; i < rules.length; i++) {
    const r = rules[i];
    const res = normalizeRule(r);
    if (!res.ok) {
      skipped++;
      console.warn(`[redirects] Skip #${i}: ${res.reason}`);
      continue;
    }
    const ruleLocaleRaw = normalizeLocale(r?.locale);
    const targets =
      ruleLocaleRaw === ""
        ? locales
        : locales.includes(ruleLocaleRaw)
          ? [ruleLocaleRaw]
          : [];
    if (targets.length === 0) {
      skipped++;
      console.warn(
        `[redirects] Skip #${i}: unknown/disabled locale "${r?.locale}" (leave blank for all)`
      );
      continue;
    }
    for (const locale of targets) {
      const prefix = String(prefixByLocale[locale] ?? "").trim();
      const from = ensurePrefixed(res.value.from, prefix);
      if (!from) {
        skipped++;
        console.warn(`[redirects] Skip #${i}: could not build from for locale=${locale}`);
        continue;
      }
      let to = res.value.to;
      if (!isExternal(to) && to.startsWith("/")) {
        const toPrefixed = ensurePrefixed(to, prefix);
        if (!toPrefixed) {
          skipped++;
          console.warn(`[redirects] Skip #${i}: could not build to for locale=${locale}`);
          continue;
        }
        to = toPrefixed;
      }
      lines.push(toLine(from, to, res.value.status, res.value.force));
    }
  }
  const header = [
    "# AUTO-GENERATED FROM PRISMIC navigation_rules.redirect_rules[]",
    "# DO NOT EDIT BY HAND.",
    `# Generated: ${new Date().toISOString()}`,
    "",
  ].join("\n");
  await fs.mkdir(path.dirname(OUT_PATH), { recursive: true });
  await fs.writeFile(
    OUT_PATH,
    header + (lines.length ? lines.join("\n") + "\n" : ""),
    "utf8"
  );
  console.log(`[redirects] Wrote ${lines.length} redirects to ${OUT_PATH}`);
  if (skipped) console.log(`[redirects] Skipped ${skipped} invalid/disabled rules (see warnings)`);
}

main().catch((e) => {
  console.error("[redirects] Fatal error:");
  console.error(e);
  process.exit(1);
});
