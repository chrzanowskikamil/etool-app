'use client';

import { Button } from './ui/button';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';

export function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();

  const handleSwitchTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      variant={'outline'}
      size={'icon'}
      onClick={() => handleSwitchTheme()}>
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
}
