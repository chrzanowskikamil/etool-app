'use server';
import { Argon2id } from 'oslo/password';
import { auth } from '@/lib/auth';
import { deleteResetPasswordTokenById, getResetPasswordToken, updateUserPassword } from '@/db/queries/user';

export const createNewPassword = async (newPassword: string, verificationToken: string) => {
  try {
    const token = await getResetPasswordToken(verificationToken);

    if (!token) return { error: 'Setting a new password - failed', message: 'The token is invalid or expired. Try reset your password again.' };

    await deleteResetPasswordTokenById(verificationToken);
    await auth.invalidateUserSessions(token.userId);
    const newHashedPassword = await new Argon2id().hash(newPassword);
    await updateUserPassword(token.userId, newHashedPassword);

    return { success: 'Setting a new password - success', message: 'Your password has been changed - log in using your new credentials' };
  } catch (error) {
    return { error: 'Setting a new password - failed', message: 'Oops, something went wrong on the server' };
  }
};
