import fs from "node:fs/promises";
import path from "node:path";

const OUT_TS = path.join(process.cwd(), "src", "generated", "navigation-routing.ts");
const OUT_JSON = path.join(process.cwd(), "src", "generated", "navigation-routing.json");

const RESERVED_PREFIXES = new Set([
  "api",
  "_next",
  "assets",
  "slice-simulator",
  "auth",
  ".netlify",
  "netlify",
]);

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

function normalizePrefix(s) {
  return String(s || "").trim().replace(/^\/+|\/+$/g, "").toLowerCase();
}

function isValidPrefix(prefix) {
  if (!prefix) return { ok: false, reason: "blank" };
  if (RESERVED_PREFIXES.has(prefix)) return { ok: false, reason: "reserved" };
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(prefix)) return { ok: false, reason: "invalid chars" };
  return { ok: true };
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

async function main() {
  const doc = await fetchNavigationRulesDoc();

  const defaultLocaleRaw = doc.data?.default_locale;
  let defaultLocale = normalizeLocale(defaultLocaleRaw);

  const localesGroup = doc.data?.locales;
  if (!Array.isArray(localesGroup)) {
    throw new Error('navigation_rules.locales[] must be a Group field');
  }

  const enabledLocales = [];
  let warnings = 0;

  for (let i = 0; i < localesGroup.length; i++) {
    const row = localesGroup[i];

    const enabled = Boolean(row?.enabled);
    if (!enabled) continue;

    const locale = normalizeLocale(row?.locale);
    if (!locale) {
      warnings++;
      console.warn(`[nav-routing] Skip locales[${i}] missing locale`);
      continue;
    }

    const label = String(row?.label || "").trim() || locale;
    const rawPrefix = normalizePrefix(row?.url_prefix);

    enabledLocales.push({ locale, label, rawPrefix, index: i });
  }

  if (enabledLocales.length === 0) {
    throw new Error("[nav-routing] No enabled locales found in navigation_rules.locales[]");
  }

  if (!defaultLocale || !enabledLocales.some((l) => l.locale === defaultLocale)) {
    warnings++;
    console.warn(
      `[nav-routing] default_locale "${defaultLocaleRaw}" is missing/disabled; falling back to "${enabledLocales[0].locale}"`
    );
    defaultLocale = enabledLocales[0].locale;
  }

  const prefixByLocale = {};
  const localeByPrefix = {};
  const labelsByLocale = {};

  for (const l of enabledLocales) {
    labelsByLocale[l.locale] = l.label;

    if (l.locale === defaultLocale && l.rawPrefix === "") {
      prefixByLocale[l.locale] = "";
      continue;
    }

    let prefix = l.rawPrefix || l.locale;

    prefix = normalizePrefix(prefix);
    const v = isValidPrefix(prefix);
    if (!v.ok) {
      warnings++;
      console.warn(
        `[nav-routing] Invalid url_prefix "${l.rawPrefix}" for locale="${l.locale}" (reason=${v.reason}); falling back to "${l.locale}"`
      );
      prefix = l.locale;
    }

    if (localeByPrefix[prefix] && localeByPrefix[prefix] !== l.locale) {
      warnings++;
      console.warn(
        `[nav-routing] Duplicate prefix "${prefix}" for locales "${localeByPrefix[prefix]}" and "${l.locale}". Falling back to "${l.locale}" prefix for "${l.locale}".`
      );
      prefix = l.locale;
    }

    prefixByLocale[l.locale] = prefix;
    localeByPrefix[prefix] = l.locale;
  }

  if (prefixByLocale[defaultLocale] === undefined) {
    prefixByLocale[defaultLocale] = "";
  }

  const payload = {
    defaultLocale,
    locales: enabledLocales.map((l) => l.locale),
    prefixByLocale,
    localeByPrefix,
    labelsByLocale,
  };

  await fs.mkdir(path.dirname(OUT_TS), { recursive: true });
  await fs.writeFile(OUT_JSON, JSON.stringify(payload, null, 2), "utf8");

  const ts = `
export const defaultLocale = ${JSON.stringify(payload.defaultLocale)} as const;
export const locales = ${JSON.stringify(payload.locales)} as const;

export const prefixByLocale = ${JSON.stringify(payload.prefixByLocale, null, 2)} as const;
export const localeByPrefix = ${JSON.stringify(payload.localeByPrefix, null, 2)} as const;
export const labelsByLocale = ${JSON.stringify(payload.labelsByLocale, null, 2)} as const;

export type Locale = keyof typeof prefixByLocale;
export type Prefix = keyof typeof localeByPrefix;

export function normalizeSegment(s: string): string {
  return String(s || "").trim().replace(/^\\/+|\\/+$/g, "").toLowerCase();
}

export function isKnownPrefix(seg: string): seg is Prefix {
  const n = normalizeSegment(seg);
  return Object.prototype.hasOwnProperty.call(localeByPrefix, n);
}

export function getDefaultLocale(): Locale {
  return defaultLocale as Locale;
}

export function getPrefixForLocale(locale: string): string {
  return (prefixByLocale as any)[String(locale).toLowerCase()] ?? "";
}

export function getLocaleByPrefix(prefix: string): Locale {
  const n = normalizeSegment(prefix);
  return (localeByPrefix as any)[n] as Locale;
}
`;
  await fs.writeFile(OUT_TS, ts, "utf8");

  console.log(`[nav-routing] Wrote ${OUT_TS}`);
  console.log(`[nav-routing] Wrote ${OUT_JSON}`);
  if (warnings) console.log(`[nav-routing] Warnings: ${warnings} (see above)`);
}

main().catch((e) => {
  console.error("[nav-routing] Fatal error:");
  console.error(e);
  process.exit(1);
});
