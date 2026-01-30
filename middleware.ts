import { NextRequest, NextResponse } from "next/server";

const locales = ["pt", "en", "es"];
const defaultLocale = "pt";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignora arquivos internos
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return;
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  const acceptLanguage = request.headers.get("accept-language");
  const browserLocale = acceptLanguage?.split(",")[0].split("-")[0];

  const locale = locales.includes(browserLocale || "")
    ? browserLocale
    : defaultLocale;

  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
