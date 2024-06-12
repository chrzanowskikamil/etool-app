import { AuthHero } from '@/components/auth-hero';
import type { Metadata } from 'next';
import { montserratFont } from '@/utils/font';
import Providers from '@/lib/providers/providers';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'ETool - Auth',
  description: 'ETool - A tool for managing your repairs',
};

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang='en'
      suppressHydrationWarning>
      <body className={`${montserratFont.className} lg:flex h-screen`}>
        <Providers>
          {children}
          <AuthHero />
        </Providers>
      </body>
    </html>
  );
}
