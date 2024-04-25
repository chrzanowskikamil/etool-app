'use client';

import { Button } from './ui/button';
import { LoadingSpinner } from './icons';
import { signOut } from '@/server/auth/sign-out';
import { useState } from 'react';

export function LogoutButton() {
  const [loading, setLoading] = useState<boolean>();
  const handleLogout = async () => {
    await signOut();
    setLoading(true);
  };

  return <Button onClick={() => handleLogout()}>Logout{loading ? <LoadingSpinner /> : null}</Button>;
}
