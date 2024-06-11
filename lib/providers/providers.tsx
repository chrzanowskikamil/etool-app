'use client';
import { ReactNode } from 'react';
import { ThemeProvider } from './theme-provider';
import { ToasterProvider } from './toaster-provider';
import { QueryProvider } from './query-provider';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider>
        <ToasterProvider />
        {children}
      </ThemeProvider>
    </QueryProvider>
  );
}
