import Link from 'next/link';
import { Button } from './ui/button';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { ROUTES } from '@/utils';
import { getSession } from '@/lib/session';

export async function MobileNavButton() {
  const { user } = await getSession();
  const MOBILE_NAVBAR_ITEMS = [
    {
      title: 'Docs',
      href: ROUTES.DOCS,
    },
    {
      title: 'About',
      href: ROUTES.ABOUT,
    },
    {
      title: 'Reviews',
      href: ROUTES.REVIEWS,
    },
    {
      title: 'Contact',
      href: ROUTES.CONTACT,
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
              <Link href={ROUTES.LOGIN}>Sign in</Link>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem asChild>
              <Link href={ROUTES.DASHBOARD}>Dashboard</Link>
            </DropdownMenuItem>
          )}
          {mobileNavbarItems}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
