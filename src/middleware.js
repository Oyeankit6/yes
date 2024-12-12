import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value || "";

  // Define protected and public routes
  const protectedRoutes = new Set(["/MyProfile", "/Win"]);
  const authRoutes = new Set(["/login", "/Register"]);

  // Redirect unauthenticated users trying to access `/MyProfile` to `/register`
  if (!token && path === "/MyProfile") {
    return NextResponse.redirect(new URL("/Register", request.url));
  }

  // Redirect unauthenticated users trying to access other protected routes to `/login`
  if (!token && protectedRoutes.has(path)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect authenticated users trying to access auth routes to `/MyProfile`
  if (token && authRoutes.has(path)) {
    return NextResponse.redirect(new URL("/MyProfile", request.url));
  }

  return NextResponse.next(); // Allow the user to proceed
}

export const config = {
  matcher: [
    "/Win/:path*", // Protect any sub-paths under /Win
    "/MyProfile", // Protect /MyProfile
    "/Register", // Restrict /register to logged-out users
    "/login", // Restrict /login to logged-out users
  ],
};
