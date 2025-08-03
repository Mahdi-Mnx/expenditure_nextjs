// middleware.ts
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard", "/admin"];

const adminRoutes = [
  "/admin",
  "/admin/profile",
  "/admin/predictions",
  "/admin/users",
  "/admin/analytics",
];

const userRoutes = [
  "/dashboard",
  "/profile",
  "/predict",
  "/compare",
  "/predict/new",
];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const pathname = req.nextUrl.pathname;

  // Check if route is protected or belongs to user/admin routes
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));
  const isUserRoute = userRoutes.some(
    (route) => pathname.startsWith("/" + route.replace(/^\//, "")) // Ensure leading slash
  );

  // Handle 404 for non-existent routes
  if (
    !isProtectedRoute &&
    !isAdminRoute &&
    !isUserRoute &&
    !pathname.startsWith("/auth")
  ) {
    return NextResponse.next();
  }

  // If no session and trying to access protected route
  if (!session && (isProtectedRoute || isAdminRoute || isUserRoute)) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (session) {
    // Get user profile to check user_type
    const { data: profile } = await supabase
      .from("profiles")
      .select("user_type")
      .eq("id", session.user.id)
      .single();

    const userType = profile?.user_type || "user";

    // Prevent admin from accessing user routes
    if (userType === "admin" && isUserRoute) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    // Prevent user from accessing admin routes
    if (userType === "user" && isAdminRoute) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // If logged in and trying to access login page, redirect to appropriate dashboard
    if (pathname.startsWith("/auth/login")) {
      const redirectPath = userType === "admin" ? "/admin" : "/dashboard";
      return NextResponse.redirect(new URL(redirectPath, req.url));
    }
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
