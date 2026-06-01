import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "./lib/session";

const protectedRoutes = ["/", "/transactions", "/investments", "/goals", "/profile"];
const publicRoutes = ["/login", "/register"];

export default async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute =
    protectedRoutes.includes(path) ||
    path.startsWith("/transactions") ||
    path.startsWith("/investments") ||
    path.startsWith("/goals") ||
    path.startsWith("/profile");
  const isPublicRoute = publicRoutes.includes(path);

  const session = await getSession();

  // Redirect to login if accessing a protected route without session
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect to dashboard if trying to access auth pages while already logged in
  if (isPublicRoute && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
