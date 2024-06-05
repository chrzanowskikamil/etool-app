'use server';
import { action } from '@/lib/safe-action';
import { createResetPasswordLink } from '@/utils/paths';
import { generateResetPasswordToken } from '@/features/user/actions/tokens';
import { getUserByUsername } from '@/db/queries/user';
import { RESET_PASSWORD_FORM_SCHEMA } from '@/features/user/schemas/reset-password-form-schema';
import { sendEmail } from './send-email';

export const sendPasswordResetLink = action(RESET_PASSWORD_FORM_SCHEMA, async ({ username }) => {
  try {
    const user = await getUserByUsername(username);

    if (!user) {
      return { error: 'Reseting - failed', message: 'User not found' };
    }

    const resetPasswordToken = await generateResetPasswordToken(user.id);
    await sendEmail({ to: username, subject: 'Reset your password', text: `Click on this link to reset your password: ${createResetPasswordLink(resetPasswordToken)}` });

    return { success: 'Reseting - success', message: 'Password reset link has been sent to your email' };
  } catch (error) {
    return { error: 'Reseting - failed', message: 'Oops, something went wrong on the server' };
  }
});
