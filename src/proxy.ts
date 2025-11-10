import { NextResponse, type NextRequest } from "next/server";

import { getSessionFromRequest } from "@/src/lib/session";

export const ADMIN_PREFIX = "/admin";

export const PROTECTED_MATCHERS = [ADMIN_PREFIX, `${ADMIN_PREFIX}/:path*`];
export const LOGIN_ROUTE = "/auth/login";

export function shouldProtect(pathname: string): boolean {
  if (!pathname.startsWith("/")) {
    return false;
  }

  if (pathname === ADMIN_PREFIX) {
    return true;
  }

  return pathname.startsWith(`${ADMIN_PREFIX}/`);
}

export async function proxy(request: NextRequest): Promise<NextResponse | null> {
  const { pathname } = request.nextUrl;

  if (!shouldProtect(pathname)) {
    return null;
  }

  const session = await getSessionFromRequest(request);

  if (session) {
    return null;
  }

  const loginUrl = new URL(LOGIN_ROUTE, request.url);
  loginUrl.searchParams.set("from", pathname);

  return NextResponse.redirect(loginUrl);
}

export const proxyConfig = {
  matcher: PROTECTED_MATCHERS,
};
