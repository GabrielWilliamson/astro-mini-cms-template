// src/lib/auth.ts
import bcrypt from "bcryptjs";
import { db, eq, user as User, session as Session } from "astro:db";

const SESSION_DURATION = 1000 * 60 * 60 * 24 * 30; // 30 days
const SESSION_COOKIE_NAME = "session_id";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateSessionToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function createSession(userId: string) {
  const sessionId = crypto.randomUUID();
  const token = generateSessionToken();
  const expiresAt = new Date(Date.now() + SESSION_DURATION);

  await db.insert(Session).values({
    id: token,
    userId,
    expiresAt,
  });

  return { token, expiresAt };
}

export async function validateSession(token: string) {
  const result = await db
    .select({
      user: User,
      session: Session,
    })
    .from(Session)
    .innerJoin(User, eq(Session.userId, User.id))
    .where(eq(Session.id, token))
    .get();

  if (!result) {
    return { user: null, session: null };
  }

  const { user, session } = result;

  if (Date.now() >= session.expiresAt.getTime()) {
    await db.delete(Session).where(eq(Session.id, token));
    return { user: null, session: null };
  }

  const shouldRenew =
    Date.now() >= session.expiresAt.getTime() - SESSION_DURATION / 2;

  if (shouldRenew) {
    const newExpiresAt = new Date(Date.now() + SESSION_DURATION);
    await db
      .update(Session)
      .set({ expiresAt: newExpiresAt })
      .where(eq(Session.id, token));
    session.expiresAt = newExpiresAt;
  }

  return { user, session };
}

export async function invalidateSession(token: string) {
  await db.delete(Session).where(eq(Session.id, token));
}

export async function invalidateUserSessions(userId: string) {
  await db.delete(Session).where(eq(Session.userId, userId));
}

export function setSessionCookie(cookies: any, token: string, expiresAt: Date) {
  cookies.set(SESSION_COOKIE_NAME, token, {
    path: "/",
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: "lax",
    expires: expiresAt,
  });
}

export function deleteSessionCookie(cookies: any) {
  cookies.set(SESSION_COOKIE_NAME, "", {
    path: "/",
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: "lax",
    maxAge: 0,
  });
}

export const SESSION_COOKIE = SESSION_COOKIE_NAME;
