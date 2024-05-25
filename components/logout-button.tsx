'use client';
import { Button } from './ui/button';
import { signOutUser } from '@/features/user/actions/sign-out-user';

export function LogoutButton() {
  const handleLogout = async () => await signOutUser();

  return <Button onClick={() => handleLogout()}>Logout</Button>;
}
