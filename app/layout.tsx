import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import Logout from './logout';

export const metadata: Metadata = {
  title: 'ETool',
  description: 'ETool - A tool for managing your repairs',
};

const montserratFont = Montserrat({ subsets: ['latin'] });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  return (
    <html lang='en'>
      <body className={montserratFont.className}>
        <nav>
          {!!session && <Logout />}
          {!session && <Link href='/login'> Login </Link>}
        </nav>
        {children}
      </body>
    </html>
  );
}
