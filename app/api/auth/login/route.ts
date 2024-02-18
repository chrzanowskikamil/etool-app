import prisma from '@/lib/prisma';
import { Argon2id } from 'oslo/password';
import { auth } from '@/lib/auth';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { LOGIN_FORM_SCHEMA } from '@/schemas/auth';

export async function POST(request: Request) {
  const parsedData = LOGIN_FORM_SCHEMA.parse(await request.json());
  try {
    const { username, password } = parsedData;

    const user = await prisma.user.findFirst({
      where: { username },
    });

    if (!user?.username) {
      return NextResponse.json({ message: 'Logging failed', description: 'This email addres is not registered', status: 409 });
    }

    const isPasswordValid = await new Argon2id().verify(user.hashed_password, password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Bad credentials', description: 'Make sure you entered the correct credentials ', status: 401 });
    }

    const session = await auth.createSession(user.id, {});
    const sessionCookie = auth.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return NextResponse.json({ message: 'Successful Login', description: `Hello ${user.firstName}, have a nice day!`, status: 201 });
  } catch (error) {
    console.log(error);
  }
}
