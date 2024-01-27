import Link from 'next/link';
import { DashboardIcon } from '@radix-ui/react-icons';
import { buttonVariants } from './ui/button';
import { Logo } from './logo';
import { MobileNavButton } from './mobile-nav-button';
import { ThemeToggleButton } from './theme-toggle-button';
import { ROUTES } from '@/lib/routes';

export function Navbar() {
  const NAVBAR_ITEMS = [
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

  const navbarItems = NAVBAR_ITEMS.map((item) => (
    <li
      className='transition-colors hover:text-foreground/80 text-foreground/60'
      key={item.title}>
      <Link href={item.href}>{item.title}</Link>
    </li>
  ));

  return (
    <nav className='sticky top-0 z-50 w-full border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <header className='container flex max-w-screen-2xl items-center w-full'>
        <ul className='mr-8'>
          <li>
            <Link href={ROUTES.HOME}>
              <Logo
                size='40px'
                title='ETool'
              />
            </Link>
          </li>
        </ul>
        <ul className='hidden md:flex gap-8 text-sm'>{navbarItems}</ul>
        <ul className='flex flex-1 justify-end items-center space-x-2'>
          <li className='mx-4'>
            <ThemeToggleButton />
          </li>
          <li className='hidden md:inline-flex'>
            <Link
              href={ROUTES.DASHBOARD}
              className={buttonVariants({ variant: 'outline' })}>
              <DashboardIcon className='mr-2' /> Dashboard
            </Link>
          </li>
          <li className='md:hidden'>
            <MobileNavButton />
          </li>
        </ul>
      </header>
    </nav>
  );
}
