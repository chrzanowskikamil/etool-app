'use client';

import { signOut } from 'next-auth/react';

export function LogoutButton() {
  return (
    <a
      className='w-52  hover:cursor-pointer'
      onClick={() => signOut()}>
      Logout
    </a>
  );
}
