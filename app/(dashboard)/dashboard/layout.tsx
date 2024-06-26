import { getSession } from '@/lib/auth/get-session';
import type { Metadata } from 'next';
import { montserratFont } from '@/utils/font';
import { Navbar } from '@/components/navbar';
import Providers from '@/lib/providers/providers';
import '../../styles/globals.css';

export const metadata: Metadata = {
  title: 'ETool - Dashboard',
  description: 'ETool - A tool for managing your repairs',
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = await getSession();

  return (
    <html
      lang='en'
      suppressHydrationWarning>
      <body className={montserratFont.className}>
        <Providers>
          <Navbar user={user} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
