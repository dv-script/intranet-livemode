import { NextRequest, NextResponse } from "next/server";
import { getUrl } from "./app/_lib/get-url";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authjs.session-token");
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/auth") && token) {
    return NextResponse.redirect(new URL(getUrl("/intranet")));
  }

  if (pathname === "/" && token) {
    return NextResponse.redirect(new URL(getUrl("/intranet")));
  }

  if (pathname.startsWith("/intranet") && !token) {
    return NextResponse.redirect(new URL(getUrl("/auth/sign-in")));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
