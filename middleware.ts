import createMiddleware from "next-intl/middleware";
import NextAuth from "next-auth";
import authConfig from "@/auth.config";

const { auth } = NextAuth(authConfig);

const intlMiddleware = createMiddleware({
    locales: ["en", "ru"],
    defaultLocale: "en",
    localePrefix: "always"
});

export default auth((req) => {
    // 1. Let NextAuth handle its own API routes
    if (req.nextUrl.pathname.startsWith("/api/auth")) {
        return; // Pass through to NextAuth handler
    }

    // 2. Default public routes that don't need auth or intl (static assets handled by matcher)

    // 3. Run intl middleware
    return intlMiddleware(req);
});

export const config = {
    // Skip all paths that should not be internationalized
    // This skips:
    // - api (API routes)
    // - _next (Next.js internals)
    // - static files (images, fonts, etc.)
    matcher: ['/((?!api|_next|.*\\..*).*)']
};