'use server';

import { createSession, createUser, getUser } from './session';
import { REGISTER_FORM_SCHEMA } from '@/schemas/form-schemas';
import z from 'zod';

export async function signUpByEmail(credentials: z.infer<typeof REGISTER_FORM_SCHEMA>) {
  const { username } = credentials;

  try {
    const { isUserExist } = await getUser(username);

    if (isUserExist) {
      return {
        error: 'Register Failed',
        message: 'This email is already registered',
      };
    }

    const user = await createUser(credentials);
    user && (await createSession(user.id));
    return {
      success: 'Register Success',
      message: 'You have successfully registered',
    };
  } catch (error) {
    return {
      error: 'Register Failed',
      message: 'Something went wrong',
    };
  }
}
