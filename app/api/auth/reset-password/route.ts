import prisma from '@/lib/prisma';
import { createPasswordResetToken } from '@/server/auth';
import { RESET_PASSWORD_FROM_SCHEMA } from '@/schemas/auth';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const parsedData = RESET_PASSWORD_FROM_SCHEMA.parse(await request.json());
  try {
    const { username } = parsedData;

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) return NextResponse.json({ message: 'Password reset token not created', description: 'User not found', status: 400 });

    const verificationToken = await createPasswordResetToken(user.id);
    const resetPasswordLink = `http://localhost:3000/reset-password/${verificationToken}`;
    return NextResponse.json({ message: 'Password reset token created', description: `A password reset token has been sent to your email. Your link: ${resetPasswordLink}`, status: 201 });
  } catch (error) {
    console.log(error);
  }
}
