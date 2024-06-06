'use server';
import { action } from '@/lib/safe-action';
import { Argon2id } from 'oslo/password';
import { createSession } from '@/lib/auth/create-session';
import { getUserByUsername } from '@/db/queries/user';
import { LOGIN_FORM_SCHEMA } from '@/features/user/schemas/login-form-schema';

export const signInUser = action(LOGIN_FORM_SCHEMA, async ({ username, password }) => {
  try {
    const existingUser = await getUserByUsername(username);
    if (!existingUser) return { error: 'Bad credentials', message: 'Check your email or password' };

    const isPasswordValid = await new Argon2id().verify(existingUser.hashed_password, password);
    if (!isPasswordValid) return { error: 'Bad credentials', message: 'Check your email or password' };

    await createSession(existingUser.id);
    return { success: 'You are logged in!', message: `Welcome back, ${existingUser.username}` };
  } catch (error) {
    console.error(`Error in signIn function: ${error}`);
    return { error: 'Internal server error' };
  }
});
