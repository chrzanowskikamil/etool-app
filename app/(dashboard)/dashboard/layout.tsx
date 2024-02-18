import '../../styles/globals.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'ETool',
  description: 'ETool - A tool for managing your repairs',
};

const montserratFont = Montserrat({ subsets: ['latin'] });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang='en'
      suppressHydrationWarning>
      <body className={`${montserratFont.className} relative flex min-h-screen`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
