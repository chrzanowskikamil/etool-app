'use client';

import { SunIcon, MoonIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import { ROUTES } from '@/lib/routes';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';

export function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const isHomePage = pathname === ROUTES.HOME;

  const handleSwitchTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return isHomePage ? (
    <Button
      variant={'outline'}
      size={'icon'}
      onClick={() => handleSwitchTheme()}>
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </Button>
  ) : (
    <button
      className='w-52 hover:cursor-pointer'
      onClick={() => handleSwitchTheme()}>
      Switch theme
    </button>
  );
}
