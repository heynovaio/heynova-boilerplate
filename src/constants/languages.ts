import languages from "./languages.json";

export const fullLangList = languages.fullLangList as Record<string, string>;
export type Locale = keyof typeof fullLangList;

export const locales = Object.keys(fullLangList) as Locale[];
export const defaultLocale = languages.defaultLocale as Locale;