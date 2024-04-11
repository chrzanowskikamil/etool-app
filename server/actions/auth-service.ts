'use server';

import prisma from '@/lib/prisma';
import { ROUTES } from '@/lib/routes';
import { RESET_PASSWORD_FORM_SCHEMA } from '@/schemas/auth';
import { generateId } from 'lucia';
import { TimeSpan, createDate } from 'oslo';
import { Resend } from 'resend';

const EXPIRE_IN = new TimeSpan(2, 'h');

export async function createResetPasswordLink(username: string) {
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

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: 'reset-password@etool.solutions',
      to: username,
      subject: 'Password reset',
      text: `Your password reset link: ${resetPasswordLink}`,
    });

    console.log(data, error);

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
