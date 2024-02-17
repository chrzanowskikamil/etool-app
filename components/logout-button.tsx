'use client';

import { ROUTES } from '@/lib/routes';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export function LogoutButton() {
  const router = useRouter();
  const handleLogout = async () => {
    // TODO: consider to create a functions for api calls
    const response = await fetch('api/auth/logout', {
      method: 'POST',
    });
    if (response.ok) {
      router.push(ROUTES.LOGIN);
    }
  };

  return <Button onClick={() => handleLogout()}>Logout</Button>;
}
