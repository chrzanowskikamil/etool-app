'use server';

import { Argon2id } from 'oslo/password';

export const validatePassword = async (hashed_password: string, password: string) => {
  return await new Argon2id().verify(hashed_password, password);
};
