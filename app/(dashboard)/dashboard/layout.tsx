import '../../styles/globals.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Providers from '@/lib/providers';
import { Toaster } from 'sonner';
import { Navbar } from '@/components/navbar';
import { getSession } from '@/lib/auth/get-session';

export const metadata: Metadata = {
  title: 'ETool',
  description: 'ETool - A tool for managing your repairs',
};

const montserratFont = Montserrat({ subsets: ['latin'] });
const toastPosition = 'top-right';
const toastOffset = '52px';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { user } = await getSession();
  return (
    <html
      lang='en'
      suppressHydrationWarning>
      <body className={montserratFont.className}>
        <Providers>
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'>
            <Navbar user={user} />
            {children}
            <Toaster
              toastOptions={{
                style: {
                  fontFamily: `${montserratFont.style.fontFamily}`,
                },
              }}
              offset={toastOffset}
              position={toastPosition}
              richColors
            />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
