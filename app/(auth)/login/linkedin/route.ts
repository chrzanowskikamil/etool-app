import { cookies } from 'next/headers';
import { generateState } from 'arctic';
import { linkedInOAuth } from '@/lib/auth';

export async function GET(): Promise<Response> {
  const state = generateState();
  const url: URL = await linkedInOAuth.createAuthorizationURL(state, {
    scopes: ['profile', 'email'],
  });

  cookies().set('linkedin_oauth_state', state, {
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: 'lax',
  });

  return Response.redirect(url);
}
