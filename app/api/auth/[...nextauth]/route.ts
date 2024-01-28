import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import { sql } from '@vercel/postgres';

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
        try {
          const response = await sql`
          SELECT * FROM users WHERE email = ${credentials?.email};
          `;
          const user = response.rows[0];

          if (!user) {
            return null;
          }

          const passwordCorrect = await compare(credentials?.password || '', user.password);

          if (passwordCorrect) {
            return {
              id: user.id,
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
