import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Argon2id } from 'oslo/password';
import { generateId } from 'lucia';
import { auth } from '@/lib/auth';
import { cookies } from 'next/headers';
import { REGISTER_FORM_SCHEMA } from '@/schemas/register-form-schema';

export default async function POST(request: Request, response: Response) {
  const parsedData = REGISTER_FORM_SCHEMA.parse(request.json());
  try {
    const { firstName, lastName, username, password } = parsedData;
    const hashedPassword = await new Argon2id().hash(password);
    const userId = generateId(15);

    const isUserExist = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (isUserExist) {
      console.log(response);
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
      return NextResponse.json({ title: 'Account created', description: 'You have successfully created an account', status: 200, ok: true });
    }
  } catch (error) {
    console.log(error);
  }
}
