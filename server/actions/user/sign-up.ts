'use server';

import { auth } from '@/lib/lucia-auth';
import prisma from '@/lib/prisma';
import { REGISTER_FORM_SCHEMA } from '@/schemas/form-schemas';
import { generateId } from 'lucia';
import { cookies } from 'next/headers';
import { Argon2id } from 'oslo/password';
import z from 'zod';

export async function signUpByEmail(credentials: z.infer<typeof REGISTER_FORM_SCHEMA>) {
  const { firstName, lastName, username, password } = credentials;

  try {
    const isUserExist = await prisma.user.findUnique({
      where: { username },
    });

    if (isUserExist) {
      return {
        error: 'Register Failed',
        message: 'This email is already registered',
      };
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

    const session = await auth.createSession(newUser.id, {});
    const sessionCookie = auth.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return {
      success: 'Register Success',
      message: 'You have successfully registered',
    };
  } catch (error) {
    return {
      error: 'Register Failed',
      message: 'Something went wrong',
    };
  }
}
