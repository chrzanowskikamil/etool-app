'use server';

import { LOGIN_FORM_SCHEMA } from '@/schemas/form-schemas';
import { z } from 'zod';
import { createSession, getUser } from './session';
import { Argon2id } from 'oslo/password';

export async function signIn(credentials: z.infer<typeof LOGIN_FORM_SCHEMA>) {
  const { username, password } = credentials;

  try {
    const { success, error, message, user, isUserExist } = await getUser(username);

    if (!user) return { success, error, message, isUserExist };

    const isPasswordValid = await new Argon2id().verify(user.hashed_password, password);

    if (!isPasswordValid) return { success: false, error: 'Bad credentials', message: 'Wrong password', isPasswordValid };

    await createSession(user.id);
    return { success: true, error: '', message };
  } catch (error) {
    console.error(`Error in signIn function: ${error}`);
    return {
      success: false,
      error: 'Internal server error',
      message: 'An error occurred while signing in',
    };
  }
}
