'use server';
import { auth } from '@/lib/auth';
import { cookies } from 'next/headers';
import { getSession } from '@/lib/auth/get-session';

export const signOutUser = async () => {
  const { session } = await getSession();
  await auth.invalidateSession(session?.id as string);

  const sessionCookie = auth.createBlankSessionCookie();
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
};
