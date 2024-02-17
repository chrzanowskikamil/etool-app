import { PrismaClient } from '@prisma/client';

const getPrismaClient = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof getPrismaClient>;
}

const prisma = globalThis.prisma ?? getPrismaClient();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
