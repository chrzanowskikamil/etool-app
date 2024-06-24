'use server';
import { createResetPasswordToken, createVerificationEmailToken, deleteResetPasswordTokenByUserId, deleteVerificationEmailCodeByUserId } from '@/db/queries/user';
import { generateId } from 'lucia';
import { generateRandomString, alphabet } from 'oslo/crypto';
import { TimeSpan, createDate } from 'oslo';
import { RESET_PASSWORD_TOKEN_EXPIRATION_TIME_UNIT, RESET_PASSWORD_TOKEN_EXPIRATION_TIME_VALUE, TOKEN_ID_LENGTH, VERIFICATION_EMAIL_CODE_EXPIRATION_TIME_UNIT, VERIFICATION_EMAIL_CODE_EXPIRATION_TIME_VALUE, VERIFICATION_EMAIL_CODE_LENGTH, VERIFICATION_EMAIL_CODE_PATTERN } from './utils';

export const generateResetPasswordToken = async (userId: string) => {
  const TOKEN_EXPIRATION_TIME = new TimeSpan(RESET_PASSWORD_TOKEN_EXPIRATION_TIME_VALUE, RESET_PASSWORD_TOKEN_EXPIRATION_TIME_UNIT);
  const tokenId = generateId(TOKEN_ID_LENGTH);

  await deleteResetPasswordTokenByUserId(userId);
  await createResetPasswordToken(userId, tokenId, createDate(TOKEN_EXPIRATION_TIME));

  return tokenId;
};

export const generateVerificationEmailCode = async (userId: string, email: string) => {
  const CODE_EXPIRATION_TIME = new TimeSpan(VERIFICATION_EMAIL_CODE_EXPIRATION_TIME_VALUE, VERIFICATION_EMAIL_CODE_EXPIRATION_TIME_UNIT);
  const code = generateRandomString(VERIFICATION_EMAIL_CODE_LENGTH, alphabet(VERIFICATION_EMAIL_CODE_PATTERN));

  await deleteVerificationEmailCodeByUserId(userId);
  await createVerificationEmailToken(userId, email, code, createDate(CODE_EXPIRATION_TIME));

  return code;
};
