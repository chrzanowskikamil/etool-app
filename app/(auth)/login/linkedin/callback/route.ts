import { cookies } from 'next/headers';
import { createSession } from '@/lib/auth/create-session';
import { createUserByLinkedInId, getUserByLinkedInId } from '@/db/queries/user';
import { endpointsPaths } from '@/utils/paths';
import { generateId } from 'lucia';
import { linkedInOAuth } from '@/lib/auth';
import { USER_ID_LENGTH } from '@/features/user/actions/utils';

interface LinkedInUserLocale {
  country: string;
  language: string;
}

interface LinkedInUser {
  sub: string;
  email_verified: boolean;
  name: string;
  locale: LinkedInUserLocale;
  given_name: string;
  family_name: string;
  email: string;
}

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const storedState = cookies().get('linkedin_oauth_state')?.value ?? null;

  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, { status: 400 });
  }

  try {
    const tokens = await linkedInOAuth.validateAuthorizationCode(code);
    const linkedInUserResponse = await fetch(endpointsPaths.linkedInUserApi, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });

    const linkedInUser: LinkedInUser = await linkedInUserResponse.json();
    const existingUser = await getUserByLinkedInId(linkedInUser.sub);

    if (existingUser) {
      await createSession(existingUser.id);
      return new Response(null, { status: 302, headers: { Location: '/' } });
    }

    const userId = generateId(USER_ID_LENGTH);
    await createUserByLinkedInId(userId, linkedInUser.sub, linkedInUser.email);
    await createSession(userId);

    return new Response(null, { status: 302, headers: { Location: '/' } });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong on the server.', { status: 500 });
  }
}
