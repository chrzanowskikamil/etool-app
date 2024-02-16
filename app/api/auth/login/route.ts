import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { Argon2id } from 'oslo/password';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const existingUser = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (!existingUser?.username) {
      return NextResponse.json({ message: 'User not found', status: 401 });
    }

    const validPassowrd = await new Argon2id().verify(existingUser.hashed_password, password);
    if (!validPassowrd) {
      return NextResponse.json({ message: 'Invalid password', status: 401 });
    }

    const session = await auth.createSession(existingUser.id, {});
    const sessionCookie = auth.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return NextResponse.json({ message: 'success', status: 200 });
  } catch (error) {
    console.log(error);
  }
}
