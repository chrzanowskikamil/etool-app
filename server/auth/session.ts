'use server';

import { auth } from '@/lib/lucia';
import prisma from '@/lib/prisma';
import { cache } from 'react';
import { cookies } from 'next/headers';
import { Session, User, generateId } from 'lucia';
import { z } from 'zod';
import { REGISTER_FORM_SCHEMA } from '@/schemas/form-schemas';
import { Argon2id } from 'oslo/password';

export const createSession = async (userId: string) => {
  const session = await auth.createSession(userId, {});
  const sessionCookie = auth.createSessionCookie(session.id);
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
};

export const getSession = cache(async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
  const sessionId = cookies().get(auth.sessionCookieName)?.value ?? null;

  if (!sessionId) return { user: null, session: null };

  const result = await auth.validateSession(sessionId);

  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = auth.createSessionCookie(result.session.id);
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
    if (!result.session) {
      const sessionCookie = auth.createBlankSessionCookie();
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
  } catch (error) {
    console.error(error);
  }
  return result;
});

export const createUser = async (credentials: z.infer<typeof REGISTER_FORM_SCHEMA>): Promise<User> => {
  const userId = generateId(15);
  const { firstName, lastName, username, password } = credentials;
  const hashedPassword = await new Argon2id().hash(password);

  const userData: User = {
    id: userId,
    firstName,
    lastName,
    username,
    hashed_password: hashedPassword,
  };

  try {
    return await prisma.user.create({ data: userData });
  } catch (error) {
    throw new Error(`Error in createUser function: ${error}`);
  }
};

interface GetUserResponse {
  success: boolean;
  error?: string;
  message?: string;
  isUserExist?: boolean;
  user?: User;
}

export const getUser = async (username: string): Promise<GetUserResponse> => {
  try {
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return {
        success: false,
        error: 'User not found',
        message: 'This email address is not registered',
        isUserExist: false,
      };
    }

    return {
      success: true,
      message: 'Login successful',
      isUserExist: true,
      user,
    };
  } catch (error) {
    console.error(`Error in validateUser function: ${error}`);
    throw error;
  }
};
