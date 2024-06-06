'use server';
import { action } from '@/lib/safe-action';
import { createSession } from '@/lib/auth/create-session';
import { createNewUser } from './create-new-user';
import { getUserByUsername } from '@/db/queries/user';
import { REGISTER_FORM_SCHEMA } from '../schemas/register-form-schema';

export const signUpUser = action(REGISTER_FORM_SCHEMA, async (credentials) => {
  try {
    const isUserExist = await getUserByUsername(credentials.username);
    if (isUserExist) return { error: 'User already exists' };

    const { data } = await createNewUser(credentials);
    data?.user && (await createSession(data.user.id));
    return { success: 'You are registered!' };
  } catch (error) {
    return { error: 'Internal server error' };
  }
});
