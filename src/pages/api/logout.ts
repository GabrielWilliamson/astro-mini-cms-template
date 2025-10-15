// src/pages/api/logout.ts
import type { APIRoute } from 'astro';
import { invalidateSession, deleteSessionCookie, SESSION_COOKIE } from '../../lib/auth';

export const POST: APIRoute = async ({ cookies, redirect, locals }) => {
  if (!locals.session) {
    return redirect('/login');
  }

  const sessionToken = cookies.get(SESSION_COOKIE)?.value;

  if (sessionToken) {
    await invalidateSession(sessionToken);
  }

  deleteSessionCookie(cookies);

  return redirect('/auth/login');
};
