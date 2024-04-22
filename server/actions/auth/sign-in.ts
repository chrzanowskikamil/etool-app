'use server';

import { LOGIN_FORM_SCHEMA } from '@/schemas/form-schemas';
import { createSessionAndSetCookie } from './create-session-and-set-cookie';
import { validatePassword } from './validate-password';
import { validateUser } from './validate-user';
import { z } from 'zod';

export async function signIn(credentials: z.infer<typeof LOGIN_FORM_SCHEMA>) {
  const { username, password } = credentials;

  try {
    const { success, error, message, user, isUserExist } = await validateUser(username);

    if (!user) return { success, error, message, isUserExist };

    const isPasswordValid = await validatePassword(user.hashed_password, password);

    if (!isPasswordValid) return { success: false, error: 'Bad credentials', message: 'Wrong password', isPasswordValid };

    await createSessionAndSetCookie(user.id);
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
