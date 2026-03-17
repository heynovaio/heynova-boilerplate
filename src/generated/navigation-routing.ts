
export const defaultLocale = "en-ca" as const;
export const locales = ["en-ca","fr-ca"] as const;

export const prefixByLocale = {
  "en-ca": "",
  "fr-ca": "fr"
} as const;
export const localeByPrefix = {
  "fr": "fr-ca"
} as const;
export const labelsByLocale = {
  "en-ca": "English",
  "fr-ca": "Français"
} as const;

export type Locale = keyof typeof prefixByLocale;
export type Prefix = keyof typeof localeByPrefix;

export function normalizeSegment(s: string): string {
  return String(s || "").trim().replace(/^\/+|\/+$/g, "").toLowerCase();
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
