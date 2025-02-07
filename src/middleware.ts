import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const referer = request.headers.get("referer");

  const cartReferer = referer?.includes("/cart");

  const privateRoute =
    request.nextUrl.pathname === "/profile" ||
    request.nextUrl.pathname === "/profile/address" ||
    request.nextUrl.pathname === "/cart" ||
    request.nextUrl.pathname === "/payment" ||
    request.nextUrl.pathname === "/complete";

  const loginSignupUrl =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/signup";

  const paymentUrl = request.nextUrl.pathname === "/payment";

  if (!token && privateRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && loginSignupUrl) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!cartReferer && paymentUrl) {
    return NextResponse.redirect(new URL("/", request.url));
  }


  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/profile/:path*",
    "/profile",
    "/login",
    "/signup",
    "/cart",
    "/payment",
    "/complete",
  ],
};
