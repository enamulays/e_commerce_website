import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const privateRoute =
    request.nextUrl.pathname === "/profile" ||
    request.nextUrl.pathname === "/profile/address";

  const loginSignupUrl =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/signup";

  if (!token && privateRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && loginSignupUrl) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/profile", "/login", "/signup"],
};
