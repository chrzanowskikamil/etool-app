import { githubOAuth } from '@/lib/auth';
import { generateState } from 'arctic';
import { cookies } from 'next/headers';

export async function GET(): Promise<Response> {
  const state = generateState();
  const url = await githubOAuth.createAuthorizationURL(state);

  cookies().set('github_oauth_state', state, {
    path: '/',
    secure: false,
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: 'lax',
  });

  return Response.redirect(url);
}
