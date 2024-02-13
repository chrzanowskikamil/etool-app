import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import prisma from '@/lib/prisma';
import { Argon2id } from 'oslo/password';
import { generateId } from 'lucia';
import { auth } from '@/lib/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function POST(request: Request, response: Response) {
  try {
    const { firstName, lastName, username, password } = await request.json();
    const hashedPassword = await new Argon2id().hash(password);
    const userId = generateId(15);

    console.log(firstName, lastName, username, password, hashedPassword, userId);

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
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({ message: 'success' });
}
