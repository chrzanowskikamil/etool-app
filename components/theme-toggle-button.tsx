'use client';

import { SunIcon, MoonIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import { ROUTES } from '@/utils';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';

export function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const isDashboardPage = pathname.includes(ROUTES.DASHBOARD);

  const handleSwitchTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return isDashboardPage ? (
    <Button
      variant={'ghost'}
      size={'icon'}
      onClick={() => handleSwitchTheme()}>
      Switch theme
    </Button>
  ) : (
    <Button
      variant={'outline'}
      size={'icon'}
      onClick={() => handleSwitchTheme()}>
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
}
