import { NextRequest, NextResponse } from "next/server";

const locales = ["pt", "en", "es"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

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

  return NextResponse.redirect(new URL(`/pt${pathname}`, request.url));
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};