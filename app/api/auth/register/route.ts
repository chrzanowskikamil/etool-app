import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, password } = await request.json();
    const hashedPassword = await hash(password, 10);

    const response = await prisma.users.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    console.log(response);
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({ message: 'success' });
}
