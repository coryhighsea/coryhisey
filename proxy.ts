import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const CANONICAL_DOMAIN = "coryhisey.com";

const REDIRECT_DOMAINS = [
  "www.coryhisey.com",
  "coryhighsea.com",
  "www.coryhighsea.com",
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get("host")?.toLowerCase();

  // Redirect non-canonical domains to the main domain
  if (host && REDIRECT_DOMAINS.includes(host)) {
    const url = request.nextUrl.clone();
    url.host = CANONICAL_DOMAIN;
    url.protocol = "https";
    url.port = "";
    return NextResponse.redirect(url, 308);
  }

  // Check if accessing admin routes
  if (pathname.startsWith("/admin")) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // Not authenticated
    if (!token) {
      const signInUrl = new URL("/auth/signin", request.url);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }

    // Not admin
    if (token.role !== "ADMIN" && token.role !== "MODERATOR") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
