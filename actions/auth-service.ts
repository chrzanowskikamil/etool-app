'use server';

import prisma from '@/lib/prisma';
import { generateId } from 'lucia';
import { TimeSpan, createDate } from 'oslo';

export async function createPasswordResetToken(userId: string) {
  const EXPIRE_IN = new TimeSpan(2, 'h');

  await prisma.resetPasswordToken.deleteMany({
    where: {
      userId: userId,
    },
  });

  const tokenId = generateId(40);

  await prisma.resetPasswordToken.create({
    data: {
      id: tokenId,
      token: tokenId,
      userId: userId,
      expiresAt: createDate(EXPIRE_IN),
    },
  });
  return tokenId;
}
