import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, password } = await request.json();
    const hashedPassword = await hash(password, 10);

    const response = await sql`
      INSERT INTO users (First_name, Last_name, email, password)
      VALUES (${firstName}, ${lastName}, ${email}, ${hashedPassword})`;
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({ message: 'success' });
}
