import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import prisma from 'lib/prisma';

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        try {
          const user = await prisma.users.findUnique({
            where: {
              email: credentials?.email,
            },
          });

          if (!user) {
            return null;
          }

          const passwordCorrect = await compare(credentials?.password || '', user.password);

          if (passwordCorrect) {
            return {
              id: user.id.toString(),
              email: user.email,
            };
          }
          return null;
        } catch (error) {
          console.error(`Auth error: ${error}`);
          return null;
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
