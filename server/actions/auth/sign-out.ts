'use server';

import { auth, validateRequest } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function signOut() {
  const { session } = await validateRequest();
  await auth.invalidateSession(session?.id as string);

  const sessionCookie = auth.createBlankSessionCookie();
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  return {
    status: 'success',
    message: 'You have been successfully logged out',
  };
}
