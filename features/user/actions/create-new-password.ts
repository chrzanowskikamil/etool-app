'use server';

import { Argon2id } from 'oslo/password';
import { auth } from '@/lib/auth';
import { createResetPasswordLink } from '@/utils/paths';
import { database } from '@/db';
import { generateId } from 'lucia';
import { RESET_PASSWORD_FORM_SCHEMA } from '../schemas/reset-password-form-schema';
import { sendEmail } from '@/features/email/send-email';
import { TimeSpan, createDate } from 'oslo';

export const createNewPassword = async (newPassword: string, verificationToken: string) => {
  try {
    const token = await database.resetPasswordToken.findUnique({
      where: {
        id: verificationToken,
      },
    });

    if (!token) {
      return { success: null, error: 'Setting a new password - failed', message: 'The token is invalid or expired' };
    }

    if (token) {
      await database.resetPasswordToken.delete({
        where: {
          id: verificationToken,
        },
      });
    }

    await auth.invalidateUserSessions(token.userId);
    const newHashedPassword = await new Argon2id().hash(newPassword);

    await database.user.update({
      where: {
        id: token.userId,
      },
      data: {
        hashed_password: newHashedPassword,
      },
    });

    return { success: 'Setting a new password - success', message: 'Your password has been changed - log in using your new credentials' };
  } catch (error) {
    return { success: null, error: 'Setting a new password - failed', message: 'Oops, something went wrong on the server' };
  }
};

export const createPasswordResetToken = async (userId: string) => {
  const EXPIRE_IN = new TimeSpan(2, 'h');

  await database.resetPasswordToken.deleteMany({
    where: {
      userId: userId,
    },
  });

  const tokenId = generateId(40);

  await database.resetPasswordToken.create({
    data: {
      id: tokenId,
      token: tokenId,
      userId: userId,
      expiresAt: createDate(EXPIRE_IN),
    },
  });

  return tokenId;
};

export const sendPasswordResetLink = async (username: string) => {
  const parsedData = RESET_PASSWORD_FORM_SCHEMA.parse({ username });

  try {
    const user = await database.user.findUnique({
      where: {
        username: parsedData.username,
      },
    });

    if (!user) {
      return {
        sucess: null,
        error: 'Reseting failed',
        message: `User with this email isn't exist.`,
      };
    }

    const resetPasswordToken = await createPasswordResetToken(user.id);
    sendEmail({ to: username, subject: 'Reset your password', text: `Click on this link to reset your password: ${createResetPasswordLink(resetPasswordToken)}` });

    return {
      error: null,
      success: 'Reseting - success',
      message: 'Take a look at your mailbox, we have sent you further instructions.',
    };
  } catch (error) {
    console.error(error);
    return {
      error: 'Oops, something went wrong on the server',
      message: 'Try later again',
    };
  }
};
