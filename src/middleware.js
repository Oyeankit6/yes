import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value || "";

  // Use sets for faster membership checking
  const publicRoutes = new Set(["/Home", "/Search"]);
  const protectedRoutes = new Set(["/MyProfile", "/Win"]);

  // If no token is present and the path is protected, redirect to login
  if (!token && protectedRoutes.has(path)) {
    return NextResponse.redirect(new URL("/MyProfile/login", request.url));
  }

  // If token exists and trying to access login or register, redirect to profile
  if (
    token &&
    (path === "/MyProfile/Register" || path === "/MyProfile/login")
  ) {
    return NextResponse.redirect(new URL("/MyProfile", request.url));
  }

  return NextResponse.next(); // Allow the user to proceed to the requested route
}

export const config = {
  matcher: [
    "/Win/:path*", // Matches any sub-path under /Win
    "/MyProfile", // Matches /MyProfile
    "/MyProfile/Register", // Matches /MyProfile/Register
    "/MyProfile/login", // Matches /MyProfile/login
  ],
};
