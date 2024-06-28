'use server';
import { createResetPasswordToken, createVerificationEmailToken, deleteResetPasswordTokenByUserId, deleteVerificationEmailCodeByUserId, updateEmailVerifiedStatus, verifyVerificationEmailCode } from '@/db/queries/user';
import { generateId } from 'lucia';
import { generateRandomString, alphabet } from 'oslo/crypto';
import { TimeSpan, createDate } from 'oslo';
import { RESET_PASSWORD_TOKEN_EXPIRATION_TIME_UNIT, RESET_PASSWORD_TOKEN_EXPIRATION_TIME_VALUE, TOKEN_ID_LENGTH, VERIFICATION_EMAIL_CODE_EXPIRATION_TIME_UNIT, VERIFICATION_EMAIL_CODE_EXPIRATION_TIME_VALUE, VERIFICATION_EMAIL_CODE_LENGTH, VERIFICATION_EMAIL_CODE_PATTERN } from './utils';
import { getSession } from '@/lib/auth/get-session';

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

export const checkEmailVerificationCode = async (code: string) => {
  const { user } = await getSession();
  if (!user) return { error: 'Verification failed', message: 'Unauthorized user - please log in.' };

  const isCodeValid = await verifyVerificationEmailCode(user, code);
  if (!isCodeValid) return { error: 'Invalid code', message: 'The code is invalid or has expired.' };

  await updateEmailVerifiedStatus(user.id, isCodeValid);
  return { success: 'Verification completed', message: 'Your email has been verified successfully.' };
};
