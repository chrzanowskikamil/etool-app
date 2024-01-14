import './styles/globals.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { Sidebar } from '@/components/sidebar';
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
      <body className={`${montserratFont.className} flex`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'>
          <Sidebar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
