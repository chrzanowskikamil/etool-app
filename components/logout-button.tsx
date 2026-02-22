'use client';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';
import { signOutUser } from '@/features/user/actions/sign-out-user';

export function LogoutButton() {
  const handleLogout = async () => await signOutUser();

  return (
    <Button
      className='p-2 md:w-full text-red-600 hover:bg-red-600'
      variant='ghost'
      onClick={() => handleLogout()}>
      <LogOut />
      <span className='flex-grow'>Log out</span>
    </Button>
  );
}
