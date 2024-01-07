import Link from 'next/link';
import { DashboardIcon, FileTextIcon, MagnifyingGlassIcon, PersonIcon, QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Logo } from './logo';
import { getServerSession } from 'next-auth';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';

const SIDEBAR_LINKS = [
  {
    icon: <DashboardIcon className='h-6 w-6 mr-2' />,
    name: 'Dashboard',
    href: '/dashboard',
  },
  {
    icon: <FileTextIcon className='h-6 w-6 mr-2' />,
    name: 'Reports',
    href: '/reports',
  },
  {
    icon: <QuestionMarkCircledIcon className='h-6 w-6 mr-2' />,
    name: 'Help',
    href: '/help',
  },
];

export async function Sidebar() {
  const session = await getServerSession();

  return (
    <nav className='flex flex-col justify-between w-72 h-screen p-4 bg-zinc-800 text-white'>
      <div>
        <ul>
          <li>
            <Link href={'/'}>
              <Logo />
            </Link>
            <Separator className='my-4 bg-white' />
          </li>
          {SIDEBAR_LINKS.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className='flex flex-grow items-center p-4 text-xl'>
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
          <li>
            <AlertDialog>
              <AlertDialogTrigger className='flex items-center p-4 text-xl hover:cursor-pointer'>
                <MagnifyingGlassIcon className='h-6 w-6 mr-2' />
                Search
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Search</AlertDialogTitle>
                  <AlertDialogDescription>
                    <input />
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction>
                    <button>search..</button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </li>
        </ul>
      </div>
      <div className='flex flex-col  '>
        <Separator className='my-4 bg-white' />
        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <span className='flex items-center space-x-2 hover:cursor-pointer'>
                <Avatar>
                  <AvatarImage src='https://github.com/shadcn.png' />
                  <AvatarFallback className='text-black border-2 border-black'>KC</AvatarFallback>
                </Avatar>
                <h2>Kamil Chrzanowski</h2>
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-64'>
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href={'/profile'}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Switch theme</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            className='flex px-4 text-xl hover:cursor-pointer'
            href='/login'>
            {<PersonIcon className='h-6 w-6 mr-2' />}Log in
          </Link>
        )}
      </div>
    </nav>
  );
}
