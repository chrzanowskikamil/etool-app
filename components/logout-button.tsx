'use client';

import { Button } from './ui/button';
import { LoadingSpinner } from './icons';
import { useState } from 'react';
import { signOutUser } from '@/lib/user';

export function LogoutButton() {
  const [loading, setLoading] = useState<boolean>();
  const handleLogout = async () => {
    await signOutUser();
    setLoading(true);
  };

  return <Button onClick={() => handleLogout()}>Logout{loading ? <LoadingSpinner /> : null}</Button>;
}
