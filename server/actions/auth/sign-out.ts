'use server';

import { auth } from '@/lib/lucia';
import { cookies } from 'next/headers';
import { validateRequest } from './validate-request';

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
