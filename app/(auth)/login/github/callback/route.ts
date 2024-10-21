import { Argon2id } from 'oslo/password';
import { cookies } from 'next/headers';
import { createSession } from '@/lib/auth/create-session';
import { createUserByGitHubId, getUserByUsername, updateUserGithubIdByEmail } from '@/db/queries/user';
import { endpointsPaths, urlPaths } from '@/utils/paths';
import { generateId } from 'lucia';
import { githubOAuth } from '@/lib/auth';
import { OAuth2RequestError } from 'arctic';
import { USER_ID_LENGTH } from '@/features/user/actions/utils';

interface GitHubUser {
  id: number;
  name: string;
}

interface GitHubUserEmails {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: 'public' | 'private' | null;
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

    const githubUserEmailResponse = await fetch(endpointsPaths.githubUserEmailsApi, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });

    const githubUser: GitHubUser = await githubUserResponse.json();
    const githubUserEmails: GitHubUserEmails[] = await githubUserEmailResponse.json();
    const verifiedGithubUser = githubUserEmails.find((email) => email.primary && email.verified);

    if (!verifiedGithubUser) return new Response('Primary email not found or not verified', { status: 400 });

    const existingUser = await getUserByUsername(verifiedGithubUser.email);

    if (existingUser) {
      await updateUserGithubIdByEmail(verifiedGithubUser.email, githubUser.id, verifiedGithubUser.verified);
      await createSession(existingUser.id);
      return new Response(null, { status: 302, headers: { Location: urlPaths.dashboard } });
    }

    const userId = generateId(USER_ID_LENGTH);
    const hashedPassword = await new Argon2id().hash(userId);
    await createUserByGitHubId(userId, githubUser.id, verifiedGithubUser.email, hashedPassword, githubUser.name, verifiedGithubUser.verified);
    await createSession(userId);

    return new Response(null, { status: 302, headers: { Location: urlPaths.dashboard } });
  } catch (error) {
    if (error instanceof OAuth2RequestError) {
      return new Response(error.message, { status: 400 });
    }
  }
  return new Response('Something went wrong on the server.', { status: 500 });
}
