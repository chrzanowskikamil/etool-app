import Link from 'next/link';
import { getSession } from '@/features/session/session';
import { urlPaths } from '@/utils/paths';
import { Button } from './ui/button';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

export async function MobileNavButton() {
  const { user } = await getSession();
  const MOBILE_NAVBAR_ITEMS = [
    {
      title: 'Docs',
      href: urlPaths.docs,
    },
    {
      title: 'About',
      href: urlPaths.about,
    },
    {
      title: 'Reviews',
      href: urlPaths.reviews,
    },
    {
      title: 'Contact',
      href: urlPaths.contact,
    },
  ];

  const mobileNavbarItems = MOBILE_NAVBAR_ITEMS.map((item) => (
    <DropdownMenuItem
      asChild
      key={item.title}>
      <Link href={item.href}>{item.title}</Link>
    </DropdownMenuItem>
  ));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={'outline'}
          size={'icon'}>
          <HamburgerMenuIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {!user ? (
            <DropdownMenuItem asChild>
              <Link href={urlPaths.login}>Sign in</Link>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem asChild>
              <Link href={urlPaths.dashboard}>Dashboard</Link>
            </DropdownMenuItem>
          )}
          {mobileNavbarItems}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
