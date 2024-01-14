'use client';

import { useTheme } from 'next-themes';

export function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();

  return (
    <a
      className='w-52 hover:cursor-pointer'
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Switch theme
    </a>
  );
}
