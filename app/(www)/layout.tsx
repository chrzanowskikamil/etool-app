import type { Metadata } from 'next';
import { montserratFont } from '@/utils/font';
import Providers from '@/lib/providers/providers';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'ETool - Home',
  description: 'ETool - A tool for managing your repairs',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang='en'
      suppressHydrationWarning>
      <body className={`${montserratFont.className} flex flex-col h-screen`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
