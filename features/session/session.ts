'use server';

import { auth } from '@/lib/auth';
import { cache } from 'react';
import { cookies } from 'next/headers';
import { Session, User } from 'lucia';

export const createSession = async (userId: string) => {
  const session = await auth.createSession(userId, {});
  const sessionCookie = auth.createSessionCookie(session.id);
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
};

export const getSession = cache(async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
  const sessionId = cookies().get(auth.sessionCookieName)?.value ?? null;

  if (!sessionId) return { user: null, session: null };

  const result = await auth.validateSession(sessionId);

  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = auth.createSessionCookie(result.session.id);
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
    if (!result.session) {
      const sessionCookie = auth.createBlankSessionCookie();
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
  } catch (error) {
    console.error(error);
  }
  return result;
});
