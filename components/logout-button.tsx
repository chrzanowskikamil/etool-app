'use client';
import { Button } from './ui/button';
import { signOutUser } from '@/features/user/actions/sign-out-user';

export function LogoutButton() {
  const handleLogout = async () => await signOutUser();

  return (
    <Button
      className='p-2 md:w-full'
      variant='ghost'
      onClick={() => handleLogout()}>
      Logout
    </Button>
  );
}
