"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";

import { fullLangList } from "@/constants/languages";
import {
  defaultLocale,
  locales as enabledLocales,
  prefixByLocale,
  localeByPrefix,
  normalizeSegment,
  isKnownPrefix,
  labelsByLocale,
} from "@/generated/navigation-routing";

interface LanguageSwitcherProps {
  classname?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  classname,
}) => {
  const router = useRouter();
  const pathname = usePathname() || "/";

  const parts = pathname.split("/");
  const firstSeg = parts[1] ? normalizeSegment(parts[1]) : "";
  const hasPrefix = firstSeg && isKnownPrefix(firstSeg);

  const currentLocale = hasPrefix ? localeByPrefix[firstSeg] : defaultLocale;

  const restPath =
    hasPrefix ? `/${parts.slice(2).join("/")}` : `/${parts.slice(1).join("/")}`;
  const normalizedRest = restPath === "/" ? "" : restPath.replace(/\/+$/, "");

  function buildPathForLocale(locale: string) {
    const prefix = (prefixByLocale as any)[locale] as string | undefined;

    if (!prefix) {
      return normalizedRest || "/";
    }

    return `/${prefix}${normalizedRest || ""}`;
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    const nextPath = buildPathForLocale(nextLocale);
    router.push(nextPath);
  };

  return (
    <div className={`print:hidden ${classname ?? ""}`}>
      <div className="inline-flex text-sm items-center px-2 pt-1 pb-2 bg-midnight md:bg-transparent border-t border-l rounded-tl-lg lg:border-none">
        <label htmlFor="language-switcher" className="px-1 py-1 text-sm">
          Language:
        </label>

        <select
          id="language-switcher"
          value={currentLocale}
          onChange={handleLanguageChange}
          className="bg-transparent px-1 py-1 rounded-lg text-sm transition-all"
          aria-label="Select language"
        >
          {(enabledLocales as readonly string[]).map((locale) => (
            <option key={locale} value={locale}>
              {(labelsByLocale as any)?.[locale] ??
                (fullLangList as any)?.[locale] ??
                locale}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
