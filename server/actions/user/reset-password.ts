'use server';

import prisma from '@/lib/prisma';
import { ROUTES } from '@/lib/routes';
import { NEW_PASSWORD_FORM_SCHEMA, RESET_PASSWORD_FORM_SCHEMA } from '@/schemas/auth';
import { generateId } from 'lucia';
import { TimeSpan, createDate } from 'oslo';
import { sendEmail } from '../email/send-email';
import { auth } from '@/lib/auth';
import { Argon2id } from 'oslo/password';

const EXPIRE_IN = new TimeSpan(2, 'h');

export async function createPasswordResetToken(userId: string) {
  await prisma.resetPasswordToken.deleteMany({
    where: {
      userId: userId,
    },
  });

  const tokenId = generateId(40);

  await prisma.resetPasswordToken.create({
    data: {
      id: tokenId,
      token: tokenId,
      userId: userId,
      expiresAt: createDate(EXPIRE_IN),
    },
  });

  return tokenId;
}

export async function sendPasswordResetLink(username: string) {
  const parsedData = RESET_PASSWORD_FORM_SCHEMA.parse({ username });

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: parsedData.username,
      },
    });

    if (!user) {
      return {
        error: 'Reseting failed',
        message: `User with this email isn't exist.`,
      };
    }

    const resetPasswordToken = await createPasswordResetToken(user.id);
    const resetPasswordLink = `${process.env.NEXT_PUBLIC_BASE_URL}${ROUTES.NEW_PASSWORD}?token=${resetPasswordToken}`;
    sendEmail({ to: username, subject: 'Reset your password', text: `Click on this link to reset your password: ${resetPasswordLink}` });

    return {
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
}

export async function createNewPassword(newPassword: string, verificationToken: string) {
  try {
    const token = await prisma.resetPasswordToken.findUnique({
      where: {
        id: verificationToken,
      },
    });

    if (!token) {
      return { error: 'Setting a new password - failed', message: 'The token is invalid or expired' };
    }

    if (token) {
      await prisma.resetPasswordToken.delete({
        where: {
          id: verificationToken,
        },
      });
    }

    await auth.invalidateUserSessions(token.userId);
    const hashedPassword = await new Argon2id().hash(newPassword);

    await prisma.user.update({
      where: {
        id: token.userId,
      },
      data: {
        hashed_password: hashedPassword,
      },
    });

    const session = await auth.createSession(token.userId, {});
    const sessionCookie = auth.createSessionCookie(session.id);
    const sessionCookiePlainObject = JSON.parse(JSON.stringify(sessionCookie));
    return { success: 'Setting a new password - success', message: 'Your password has been changed - log in using your new credentials', sessionCookiePlainObject };
  } catch (error) {
    return { error: 'Setting a new password - failed', message: 'Oops, something went wrong on the server' };
  }
}
