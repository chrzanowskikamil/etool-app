import prisma from '@/lib/prisma';
import { Argon2id } from 'oslo/password';
import { auth } from '@/lib/auth';
import { NEW_PASSWORD_FORM_SCHEMA } from '@/schemas/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const requestData = await request.json();
  const { value, verificationToken } = requestData;
  try {
    const { password } = NEW_PASSWORD_FORM_SCHEMA.parse(value);

    const token = await prisma.resetPasswordToken.findUnique({
      where: {
        id: verificationToken,
      },
    });

    if (!token) {
      return NextResponse.json({ message: 'Setting a new password - failed', description: 'The token is invalid or expired', status: 400 });
    }

    if (token) {
      await prisma.resetPasswordToken.delete({
        where: {
          id: verificationToken,
        },
      });
    }

    await auth.invalidateUserSessions(token.userId);
    const hashedPassword = await new Argon2id().hash(password);

    await prisma.user.update({
      where: {
        id: token?.userId,
      },
      data: {
        hashed_password: hashedPassword,
      },
    });

    const session = await auth.createSession(token?.userId, {});
    const sessionCookie = auth.createSessionCookie(session.id);
    return NextResponse.json({ message: 'Setting a new password - success', description: 'Your password has been changed - log in using your new credentials', status: 200, sessionCookie });
  } catch (error) {
    console.log(error);
  }
}
