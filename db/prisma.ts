import { PrismaClient } from '@prisma/client';

const getPrismaClient = () => {
  return new PrismaClient();
};

declare global {
  var db: undefined | ReturnType<typeof getPrismaClient>;
}

const db = globalThis.db ?? getPrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.db = db;

export { db as database };
