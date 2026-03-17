import { NextRequest, NextResponse } from "next/server";
import {
  normalizeSegment,
  isKnownPrefix,
  getDefaultLocale,
  getPrefixForLocale,
  getLocaleByPrefix,
} from "@/generated/navigation-routing";

function splitPath(pathname: string) {
  const parts = pathname.split("/");
  const first = parts[1] ? normalizeSegment(parts[1]) : "";
  const rest = "/" + parts.slice(2).join("/");
  return { first, rest: rest === "/" ? "/" : rest.replace(/\/+$/, "") || "/" };
}

function joinInternal(locale: string, rest: string) {
  return `/${locale}${rest === "/" ? "" : rest}`;
}

export default function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  const defaultLocale = getDefaultLocale();
  const defaultPrefix = getPrefixForLocale(defaultLocale);

  const { first, rest } = splitPath(pathname);

  if (first && isKnownPrefix(first)) {
    const locale = getLocaleByPrefix(first);
    const internalPath = joinInternal(locale, rest);
    url.pathname = internalPath;
    return NextResponse.rewrite(url);
  }

  if (first && first === defaultLocale && defaultPrefix === "") {
    const canonical = req.nextUrl.clone();
    canonical.pathname = rest;
    return NextResponse.redirect(canonical);
  }

  url.pathname = joinInternal(defaultLocale, pathname);
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!api|assets|slice-simulator|auth/.*|.*\\..*|_next).*)"],
};
