'use client';

import Link from 'next/link';
import { DashboardIcon } from '@radix-ui/react-icons';
import { buttonVariants } from './ui/button';
import { Logo } from './logo';
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
    <header className='sticky top-0 z-50 w-full border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex max-w-screen-2xl items-center'>
        <div className='w-full'>
          <ul className='flex items-center'>
            <li className='mr-8'>
              <Link href={ROUTES.HOME}>
                <Logo
                  size='40px'
                  title='ETool'
                />
              </Link>
            </li>
            <nav className='flex gap-8 text-sm'>{navbarItems}</nav>
            <div className='flex flex-1 justify-end items-center space-x-2'>
              <li className='mx-4'>
                <ThemeToggleButton />
              </li>
              <li>
                <Link
                  href={ROUTES.DASHBOARD}
                  className={buttonVariants({ variant: 'outline' })}>
                  <DashboardIcon className='mr-2' /> Dashboard
                </Link>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </header>
  );
}
