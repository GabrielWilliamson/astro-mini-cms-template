import { defineMiddleware } from "astro:middleware";
import { validateSession, SESSION_COOKIE, setSessionCookie } from "./lib/auth";
import { canAccessCollection } from "./lib/permissions";

export const onRequest = defineMiddleware(async (context, next) => {
  const sessionToken = context.cookies.get(SESSION_COOKIE)?.value ?? null;

  // public routes
  const publicRoutes = ["/auth/login", "/"];
  if (publicRoutes.includes(context.url.pathname)) {
    return next();
  }

  if (!sessionToken) {
    return context.redirect("/auth/login");
  }

  const { session, user } = await validateSession(sessionToken);

  if (!session || !user) {
    // redirect to login page
    return context.redirect("/auth/login");
  }

  setSessionCookie(context.cookies, session.id, session.expiresAt);

  context.locals.session = session;
  context.locals.user = user;

  const pathname = context.url.pathname;

  const match = pathname.match(/^\/admin\/collections\/([^/]+)/);
  if (match) {
    const collectionSlug = match[1];
    const canAccess = await canAccessCollection(user.role, collectionSlug as any);

    if (!canAccess) {
      return new Response("Forbidden", { status: 403 });
    }
  }

  return next();
});
