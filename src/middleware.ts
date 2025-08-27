import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { redis } from "@/lib/redis";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

const protectedRoutes = ["/dashboard$", "/send$", "/send/*$"];
const redirectRoutes = ["/login$", "/signup$"];
const SESSION_PREFIX = "session:";

export async function middleware(req: NextRequest) {
  const inProtected = protectedRoutes.some((route) =>
    new RegExp(route).test(req.nextUrl.pathname.replace(/\/$/, ""))
  );
  const inRedirect = redirectRoutes.some((route) =>
    new RegExp(route).test(req.nextUrl.pathname.replace(/\/$/, ""))
  );

  const inVerify = req.nextUrl.pathname.replace(/\/$/, "").endsWith("/verify");
  if (inVerify) {
    const signupUserId = req.cookies.get("signup_user_id")?.value;
    if (!signupUserId) {
      const res = NextResponse.redirect(new URL("/dashboard", req.url));
      return res;
    }
  }

  if (inProtected || inRedirect) {
    const session = req.cookies.get("session")?.value;
    const userId = session && (await redis.get(`${SESSION_PREFIX}${session}`));

    // Protect routes
    if (!userId && inProtected) {
      const res = NextResponse.redirect(new URL("/login", req.url));
      res.cookies.delete("session");
      return res;
    }

    // Redirects

    if (userId && inRedirect) {
      const res = NextResponse.redirect(new URL("/dashboard", req.url));
      return res;
    }
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
