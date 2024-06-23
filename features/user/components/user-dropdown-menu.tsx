'use client';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/utils/cn';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { LogoutButton } from '@/components/logout-button';
import { PersonIcon } from '@radix-ui/react-icons';
import { Separator } from '@/components/ui/separator';
import { urlPaths } from '@/utils/paths';
import { User } from 'lucia';

interface UserDropdownMenuProps {
  user: User;
}

export default function UserDropdownMenu({ user }: UserDropdownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>
          <PersonIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='flex flex-col'>
        <DropdownMenuItem>
          <Link
            href={urlPaths.profile}
            className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }))}>
            {user.username}
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <Button
            className='w-full'
            variant='ghost'>
            Account Settings
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
