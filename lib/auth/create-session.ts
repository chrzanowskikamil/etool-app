'use server';
import { auth } from '@/lib/auth';
import { cookies } from 'next/headers';

export const createSession = async (userId: string) => {
  const session = await auth.createSession(userId, {});
  const sessionCookie = auth.createSessionCookie(session.id);
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
};
