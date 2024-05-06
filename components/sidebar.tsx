import Link from 'next/link';
import { urlPaths } from '@/utils/paths';
import { DashboardIcon, FileTextIcon, MagnifyingGlassIcon, PersonIcon, QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Separator } from './ui/separator';
import { Logo } from './logo';
import { LogoutButton } from './logout-button';
import { ThemeToggleButton } from './theme-toggle-button';
import { getSession } from '@/lib/auth/get-session';

const SIDEBAR_LINKS = [
  {
    icon: <DashboardIcon className='h-6 w-6 mr-2' />, // ! STYLING HERE LOOKS BAD
    title: 'Dashboard',
    href: urlPaths.dashboard,
  },
  {
    icon: <FileTextIcon className='h-6 w-6 mr-2' />, // ! STYLING HERE LOOKS BAD
    title: 'Reports',
    href: urlPaths.reports
  },
  {
    icon: <QuestionMarkCircledIcon className='h-6 w-6 mr-2' />, // ! STYLING HERE LOOKS BAD
    title: 'Help',
    href: urlPaths.help,
  },
];

const sidebarLinksItems = SIDEBAR_LINKS.map((item) => (
  <li key={item.title}>
    <Link
      href={item.href}
      className='flex flex-grow items-center p-4 text-xl'>
      {item.icon}
      {item.title}
    </Link>
  </li>
));

export async function Sidebar() {
  const { user } = await getSession();

  return (
    <nav
      className='flex flex-col justify-between w-72 h-screen p-4 bg-zinc-800 text-white'
      role='navigation'>
      <div>
        <ul>
          <li>
            <Link href={urlPaths.home}>
              <Logo
                size='60px'
                title='ETool'
              />
            </Link>
            <Separator className='my-4 bg-white' />
          </li>
          {sidebarLinksItems}
          <li>
            {/* // ! IMPLEMENT A FINAL VIEW */}
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
        {user ? (
          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <span className='flex items-center space-x-2 hover:cursor-pointer'>
                  <Avatar>
                    {/* // ! WHEN WE FINISHED REGISTER PAGE PLEASE HANDLE IT */}
                    <AvatarImage src='https://github.com/shadcn.png' />
                    {/* // ! CREATE  A FUNCTION TO CREATE SCHROUT FROM NAME AND SURNAME */}
                    <AvatarFallback className='text-black border-2 border-black'>KC</AvatarFallback>
                  </Avatar>
                  {/* // ! WE WANT A NAME HERE WHEN A REGISTER PAGE FINISHED */}
                  <h2>{user.username}</h2>
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link
                      className=' w-56 hover:cursor-pointer'
                      href={urlPaths.profile}>
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ThemeToggleButton />
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <AlertDialogTrigger>
                      <a>Logout</a>
                    </AlertDialogTrigger>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>You will be redirect to home page.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <LogoutButton />
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <Link
            className='flex px-4 text-xl hover:cursor-pointer'
            href={urlPaths.login}>
            {<PersonIcon className='h-6 w-6 mr-2' />}Log in
          </Link>
        )}
      </div>
    </nav>
  );
}
