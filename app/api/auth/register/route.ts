import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Argon2id } from 'oslo/password';
import { generateId } from 'lucia';
import { auth } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { firstName, lastName, username, password } = await request.json();
    const hashedPassword = await new Argon2id().hash(password);
    const userId = generateId(15);

    const isUserExist = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    console.log('isUserExist:', isUserExist);

    if (isUserExist) {
      console.log('error already registered');
      return NextResponse.json({ message: 'Username already taken', status: 401 });
    }

    if (!isUserExist) {
      await prisma.user.create({
        data: {
          id: userId,
          firstName,
          lastName,
          username,
          hashed_password: hashedPassword,
        },
      });
      const session = await auth.createSession(userId, {});
      const sessionCookie = auth.createSessionCookie(session.id);
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
      console.log('session', session);
      console.log('session cookie', sessionCookie);
      return NextResponse.json({ message: 'success', status: 200 });
    }
  } catch (error) {
    console.log(error);
  }
}
