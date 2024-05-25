'use server';
import { action } from '@/lib/safe-action';
import { createSession } from '@/lib/auth/create-session';
import { createUser } from './create-user';
import { getUserByUsername } from '@/db/queries/user';
import { REGISTER_FORM_SCHEMA } from '../schemas/register-form-schema';

export const signUpUser = action(REGISTER_FORM_SCHEMA, async (credentials) => {
  try {
    const isUserExist = await getUserByUsername(credentials.username);
    if (isUserExist) return { error: 'User already exists' };

    const user = await createUser(credentials);
    user && (await createSession(user.id));
    return { success: 'You are registered!' };
  } catch (error) {
    console.error(`Error in signUpUser function: ${error}`);
    return { error: 'Internal server error' };
  }
});
