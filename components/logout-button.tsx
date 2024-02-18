'use client';

import { ENDPOINTS, ROUTES } from '@/lib/routes';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export function LogoutButton() {
  const router = useRouter();
  const handleLogout = async () => {
    const response = await fetch(ENDPOINTS.LOGOUT, {
      method: 'POST',
    });
    if (response.ok) {
      router.push(ROUTES.LOGIN);
    }
  };

  return <Button onClick={() => handleLogout()}>Logout</Button>;
}
