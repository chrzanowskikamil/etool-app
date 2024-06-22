'use server';
import { action } from '@/lib/safe-action';
import { Argon2id } from 'oslo/password';
import { createUserByCredentials } from '@/db/queries/user';
import { REGISTER_FORM_SCHEMA } from '../schemas/register-form-schema';
import { User, generateId } from 'lucia';
import { USER_ID_LENGTH } from './utils';

type UserCredentials = Omit<User, 'githubId' | 'linkedInId'>;

export const createNewUser = action(REGISTER_FORM_SCHEMA, async (credentials) => {
  const userId = generateId(USER_ID_LENGTH);
  const { firstName, lastName, username, password } = credentials;
  const hashedPassword = await new Argon2id().hash(password);

  const userCredentials: UserCredentials = {
    id: userId,
    firstName,
    lastName,
    username,
    hashed_password: hashedPassword,
  };

  try {
    const user = await createUserByCredentials(userCredentials);
    return { user };
  } catch (error) {
    return { error: 'Internal server error' };
  }
});
