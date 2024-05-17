'use server';

import { Argon2id } from 'oslo/password';
import { REGISTER_FORM_SCHEMA } from '../schemas/register-form-schema';
import { User, generateId } from 'lucia';
import { z } from 'zod';
import { createUserByCredentials } from '@/db/queries/user';

export const createUser = async (credentials: z.infer<typeof REGISTER_FORM_SCHEMA>): Promise<User> => {
  const userId = generateId(15);
  const { firstName, lastName, username, password } = credentials;
  const hashedPassword = await new Argon2id().hash(password);

  const userCredentials: User = {
    id: userId,
    firstName,
    lastName,
    username,
    hashed_password: hashedPassword,
  };

  try {
    return await createUserByCredentials(userCredentials);
  } catch (error) {
    throw new Error(`Error in createUser function: ${error}`);
  }
};
