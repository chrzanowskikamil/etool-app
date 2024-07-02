'use server';
import { action } from '@/lib/safe-action';
import { createNewUser } from './create-new-user';
import { createSession } from '@/lib/auth/create-session';
import { getUserByUsername } from '@/db/queries/user';
import { REGISTER_FORM_SCHEMA } from '../schemas/register-form-schema';
import { sendVerificationEmailCode } from '@/features/email/actions/send-verification-email-code';

export const signUpUser = action(REGISTER_FORM_SCHEMA, async (credentials) => {
  try {
    const isUserExist = await getUserByUsername(credentials.username);
    if (isUserExist) return { error: 'User already exists' };

    const { data } = await createNewUser(credentials);
    if (data?.user) {
      await createSession(data.user.id);
      await sendVerificationEmailCode(data.user.username);
    }

    return { success: 'Account created! Check your mailbox to verify email address.' };
  } catch (error) {
    console.error(error);
    return { error: 'Internal server error' };
  }
});
