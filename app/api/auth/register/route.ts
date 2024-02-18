import prisma from '@/lib/prisma';
import { Argon2id } from 'oslo/password';
import { auth } from '@/lib/auth';
import { cookies } from 'next/headers';
import { generateId } from 'lucia';
import { NextResponse } from 'next/server';
import { REGISTER_FORM_SCHEMA } from '@/schemas/auth';

export async function POST(request: Request) {
  const parsedData = REGISTER_FORM_SCHEMA.parse(await request.json());
  try {
    const { firstName, lastName, username, password } = parsedData;

    const isUserExist = await prisma.user.findUnique({
      where: { username },
    });

    if (isUserExist) {
      return NextResponse.json({ message: 'Register Failed', description: 'This email is already registered', status: 409 });
    }

    const userId = generateId(15);
    const hashedPassword = await new Argon2id().hash(password);

    const newUser = await prisma.user.create({
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

    return NextResponse.json({ message: 'Account created', description: `Hello ${newUser.firstName}! You have successfully created an account`, status: 201 });
  } catch (error) {
    console.log(error);
  }
}
