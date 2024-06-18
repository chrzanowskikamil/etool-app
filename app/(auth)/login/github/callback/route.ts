import { database } from '@/db/prisma';
import { auth, githubOAuth } from '@/lib/auth';
import { OAuth2RequestError } from 'arctic';
import { generateId } from 'lucia';
import { cookies } from 'next/headers';

interface GitHubUser {
  id: string;
  username: string;
}

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const storedState = cookies().get('github_oauth_state')?.value ?? null;

  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, { status: 400 });
  }

  try {
    const tokens = await githubOAuth.validateAuthorizationCode(code);
    const githubUserResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });

    const githubUser: GitHubUser = await githubUserResponse.json();
    const existingUser = await database.user.findUnique({
      where: {
        githubId: githubUser.id,
      },
    });

    if (existingUser) {
      const session = await auth.createSession(existingUser.id, {});
      const sessionCookie = auth.createSessionCookie(session.id);
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
      return new Response(null, { status: 302, headers: { Location: '/' } });
    }

    const userId = generateId(16);

    await database.user.create({
      data: {
        id: userId,
        githubId: githubUser.id,
        username: githubUser.username,
        hashed_password: '',
      },
    });

    const session = await auth.createSession(userId, {});
    const sessionCookie = auth.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return new Response(null, { status: 302, headers: { Location: '/' } });
  } catch (error) {
    if (error instanceof OAuth2RequestError) {
      return new Response(null, { status: 400 });
    }
  }
  return new Response('cos jest nie tak', { status: 500 });
}
