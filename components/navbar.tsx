import Link from 'next/link';
import { DashboardIcon, LockOpen1Icon } from '@radix-ui/react-icons';
import { buttonVariants } from './ui/button';
import { Logo } from './logo';
import { MobileNavButton } from './mobile-nav-button';
import { ThemeToggleButton } from './theme-toggle-button';
import { getSession } from '@/features/session/session';
import { urlPaths } from '@/utils/paths';
import { cn } from '@/utils/cn';

export async function Navbar() {
  const { user } = await getSession();
  const NAVBAR_ITEMS = [
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
            <Link href={urlPaths.home}>
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
          {!user ? (
            <li className='hidden md:inline-flex'>
              <Link
                href={urlPaths.login}
                className={cn(buttonVariants({ variant: 'outline' }))}>
                <LockOpen1Icon className='mr-2' /> Sign in
              </Link>
            </li>
          ) : (
            <li className='hidden md:inline-flex'>
              <Link
                href={urlPaths.dashboard}
                className={cn(buttonVariants({ variant: 'outline' }))}>
                <DashboardIcon className='mr-2' /> Dashboard
              </Link>
            </li>
          )}
          <li className='md:hidden'>
            <MobileNavButton />
          </li>
        </ul>
      </header>
    </nav>
  );
}
