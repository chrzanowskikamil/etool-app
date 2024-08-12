'use server';
import { cookies } from 'next/headers';
import { generateState } from 'arctic';
import { githubOAuth, linkedInOAuth } from '@/lib/auth';
import { GITHUB_COOKIE_NAME, LINKEDIN_COOKIE_NAME, LINKEDIN_OAUTH_SCOPES } from './utils';
import { redirect } from 'next/navigation';
import { urlPaths } from '@/utils/paths';

export type ProviderName = 'github' | 'linkedin';

type OAuthProvider = {
  createAuthorizationURL: (state: string) => Promise<URL>;
  cookieName: string;
};

const oAuthProviders: Record<ProviderName, OAuthProvider> = {
  github: {
    createAuthorizationURL: (state: string) => githubOAuth.createAuthorizationURL(state),
    cookieName: GITHUB_COOKIE_NAME,
  },
  linkedin: {
    createAuthorizationURL: (state: string) => linkedInOAuth.createAuthorizationURL(state, { scopes: LINKEDIN_OAUTH_SCOPES }),
    cookieName: LINKEDIN_COOKIE_NAME,
  },
};

const setCookieOAuthState = async (cookieName: string, state: string) => {
  cookies().set(cookieName, state, {
    path: urlPaths.home,
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: 'lax',
  });
};

export const signInUserByOAuth = async (providerName: ProviderName) => {
  const provider = oAuthProviders[providerName];
  const state = generateState();
  const url = await provider.createAuthorizationURL(state);
  await setCookieOAuthState(provider.cookieName, state);
  return redirect(url.href);
};
