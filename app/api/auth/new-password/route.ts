import { Argon2id } from 'oslo/password';
import prisma from '@/lib/prisma';
import { NEW_PASSWORD_FORM_SCHEMA } from '@/schemas/auth';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const requestData = await request.json();
  const { value, verificationToken } = requestData;
  const { password } = NEW_PASSWORD_FORM_SCHEMA.parse(value);

  const token = await prisma.resetPasswordToken.findUnique({
    where: {
      id: verificationToken,
    },
  });

  if (!token) {
    return NextResponse.json({ message: 'Invalid token' });
  }

  if (token) {
    await prisma.resetPasswordToken.delete({
      where: {
        id: verificationToken,
      },
    });
  }

  await auth.invalidateUserSessions(token?.userId);
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
  return NextResponse.json({ message: 'Password reset', sessionCookie });
}
