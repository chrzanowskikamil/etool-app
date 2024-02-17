import { auth, validateRequest } from '@/lib/auth';
import { ROUTES } from '@/lib/routes';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const { session } = await validateRequest();

  await auth.invalidateSession(session?.id as string);

  const sessionCookie = auth.createBlankSessionCookie();
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
}
