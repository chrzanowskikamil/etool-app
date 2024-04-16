'use server';

import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { LOGIN_FORM_SCHEMA } from '@/schemas/auth';
import { cookies } from 'next/headers';
import { Argon2id } from 'oslo/password';
import { z } from 'zod';

export async function signIn(credentials: z.infer<typeof LOGIN_FORM_SCHEMA>) {
  const { username, password } = credentials;
  try {
    const user = await prisma.user.findFirst({
      where: { username },
    });

    if (!user?.username) {
      return {
        isUserExist: !user?.username,
        error: 'Logging failed',
        message: 'This email address is not registered',
      };
    }

    const isPasswordValid = await new Argon2id().verify(user.hashed_password, password);

    if (!isPasswordValid) {
      return {
        isPasswordValid: !isPasswordValid,
        error: 'Bad credentials',
        message: 'Make sure you entered the correct credentials',
      };
    }

    const session = await auth.createSession(user.id, {});
    const sessionCookie = auth.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return {
      success: 'Successful Login',
      message: `Hello ${user.firstName}, have a nice day! Redirecting...`,
    };
  } catch (error) {
    return {
      error: 'Logging failed',
      message: 'Something went wrong on the server',
    };
  }
}
