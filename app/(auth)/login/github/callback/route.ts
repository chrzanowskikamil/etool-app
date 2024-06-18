import { cookies } from 'next/headers';
import { createSession } from '@/lib/auth/create-session';
import { createUserByGitHubId, getUserByGitHubId } from '@/db/queries/user';
import { endpointsPaths } from '@/utils/paths';
import { generateId } from 'lucia';
import { githubOAuth } from '@/lib/auth';
import { OAuth2RequestError } from 'arctic';
import { USER_ID_LENGTH } from '@/features/user/actions/utils';

interface GitHubUser {
  id: number;
  login: string;
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
    const githubUserResponse = await fetch(endpointsPaths.githubUserApi, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });

    const githubUser: GitHubUser = await githubUserResponse.json();
    const existingUser = await getUserByGitHubId(githubUser.id);

    if (existingUser) {
      await createSession(existingUser.id);
      return new Response(null, { status: 302, headers: { Location: '/' } });
    }

    const userId = generateId(USER_ID_LENGTH);
    await createUserByGitHubId(userId, githubUser.id, githubUser.login);
    await createSession(userId);

    return new Response(null, { status: 302, headers: { Location: '/' } });
  } catch (error) {
    if (error instanceof OAuth2RequestError) {
      return new Response(error.message, { status: 400 });
    }
  }
  return new Response('Something went wrong on the server.', { status: 500 });
}
