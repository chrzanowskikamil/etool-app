import prisma from '@/lib/prisma';
import { createPasswordResetToken } from '@/actions/auth-service';
import { RESET_PASSWORD_FORM_SCHEMA } from '@/schemas/auth';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ROUTES } from '@/lib/routes';

export async function POST(request: Request) {
  const parsedData = RESET_PASSWORD_FORM_SCHEMA.parse(await request.json());
  const { username } = parsedData;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) return NextResponse.json({ message: 'Reseting failed', description: `User with this email isn't exist.`, status: 400 });

    const verificationToken = await createPasswordResetToken(user.id);
    const resetPasswordLink = `${process.env.NEXT_PUBLIC_BASE_URL}${ROUTES.NEW_PASSWORD}?token=${verificationToken}`;

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: 'reset-password@etool.solutions',
      to: username,
      subject: 'Password reset',
      text: `Your password reset link: ${resetPasswordLink}`,
    });

    if (error) {
      console.error(error);
      return NextResponse.json({ message: 'Oops, something went wrong on the server', description: 'Try later again', status: 500 });
    }

    return NextResponse.json({ data, message: 'Reseting - success', description: 'Take a look at your mailbox, we have sent you further instructions.', status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Oops, something went wrong on the server', description: 'Try later again', status: 500 });
  }
}
