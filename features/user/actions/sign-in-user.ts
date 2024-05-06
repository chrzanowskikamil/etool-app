'use server';

import { Argon2id } from 'oslo/password';
import { createSession } from '@/lib/auth/create-session';
import { findUser } from './find-user';
import { LOGIN_FORM_SCHEMA } from '@/features/user/schemas/login-form-schema';
import { z } from 'zod';

export const signInUser = async (credentials: z.infer<typeof LOGIN_FORM_SCHEMA>) => {
  const { username, password } = credentials;

  try {
    const { success, error, message, user, isUserExist } = await findUser(username);

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
};


