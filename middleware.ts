import { NextResponse } from "next/server";

export const config = {
  matcher: ["/dashboard/:path*", "/lesson/:path*", "/quiz/:path*"],
};

export function middleware(req: Request) {
  // We can't read Supabase auth token server-side without extra work in Edge middleware.
  // Instead, perform a lightweight redirect if no 'sb' cookie is present.
  // Users will still be blocked by client checks; this is a convenience UX redirect.
  const hasSupabaseCookie = Array.from(new Headers(req.headers).entries()).some(
    ([k, v]) => k.toLowerCase() === "cookie" && v.includes("sb-")
  );
  if (!hasSupabaseCookie) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}
