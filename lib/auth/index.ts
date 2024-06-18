import { database } from '../../db/prisma';
import { GitHub } from 'arctic';
import { Lucia } from 'lucia';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';

interface DatabaseUserAttributes {
  id: string;
  github_id: string | null;
  username: string;
  hashed_password: string;
  firstName: string | null;
  lastName: string | null;
}

declare module 'lucia' {
  interface Register {
    Lucia: typeof auth;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

const adapter = new PrismaAdapter(database.session, database.user);

export const auth = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
      githubId: attributes.github_id,
      username: attributes.username,
      hashed_password: attributes.hashed_password,
      firstName: attributes.firstName,
      lastName: attributes.lastName,
    };
  },
});

export const githubOAuth = new GitHub(process.env.GITHUB_CLIENT_ID!, process.env.GITHUB_CLIENT_SECRET!);
