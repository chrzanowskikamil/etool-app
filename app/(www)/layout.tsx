import '../styles/globals.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import Providers from '@/lib/providers';

export const metadata: Metadata = {
  title: 'ETool',
  description: 'ETool - A tool for managing your repairs',
};

const montserratFont = Montserrat({ subsets: ['latin'] });
const toastPosition = 'top-right';
const toastOffset = '52px';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang='en'
      suppressHydrationWarning>
      <body className={`${montserratFont.className} flex flex-col h-screen`}>
        <Providers>
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'>
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
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
