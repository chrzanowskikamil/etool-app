import Link from 'next/link';
import { Button } from './ui/button';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from './ui/sheet';
import { ROUTES } from '@/lib/routes';
import { Logo } from './logo';

export function MobileNavButton() {
  const MOBILE_NAVBAR_ITEMS = [
    {
      title: 'Dashboard',
      href: ROUTES.DASHBOARD,
    },
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
    <li
      className='text-xl font-bold p-8'
      key={item.title}>
      <Link href={item.href}>{item.title}</Link>
    </li>
  ));

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={'outline'}
          size={'icon'}>
          <HamburgerMenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side={'left'}>
        <SheetHeader>
          <Logo
            size='40'
            title='ETool'
          />
        </SheetHeader>
        <ul>{mobileNavbarItems}</ul>
      </SheetContent>
    </Sheet>
  );
}
