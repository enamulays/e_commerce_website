import { NextRequest, NextResponse } from "next/server";

export function middleware(request:NextRequest) {
  console.log(" Middleware Triggered:", request.nextUrl.pathname);

 
  const cookieHeader = request.headers.get("cookie");
  const token: string | null | undefined = cookieHeader
    ? cookieHeader
        .split("; ")
        .find((row: string) => row.startsWith("token="))
        ?.split("=")[1]
    : null;

  console.log(" Token Found:", token);

  const referer = request.headers.get("referer");
  const cartReferer = referer?.includes("/cart");

  const privateRoutes = ["/profile", "/profile/address", "/cart", "/payment", "/complete"];
  const loginSignupRoutes = ["/login", "/signup"];

  const isPrivateRoute = privateRoutes.includes(request.nextUrl.pathname);
  const isLoginSignupRoute = loginSignupRoutes.includes(request.nextUrl.pathname);
  const isPaymentRoute = request.nextUrl.pathname === "/payment";

  if (!token && isPrivateRoute) {
    console.log(" Unauthorized Access to Private Route. Redirecting to Login.");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isLoginSignupRoute) {
    console.log(" User Already Logged In. Redirecting to Home.");
    return NextResponse.redirect(new URL("/", request.url));
  }


  if (!cartReferer && isPaymentRoute) {
    console.log(" Payment Page Access Without Cart. Redirecting to Home.");
    return NextResponse.redirect(new URL("/", request.url));
  }

  console.log(" Request Passed Middleware.");
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
