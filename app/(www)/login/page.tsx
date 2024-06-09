import { getSession } from '@/lib/auth/get-session';
import { githubProfileUrl, urlPaths } from '@/utils/paths';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import LoginForm from '@/features/user/components/login-form';
import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';

export default async function LoginPage() {
  const { user } = await getSession();

  if (user) {
    redirect(urlPaths.dashboard);
  }

  return (
    <main className='flex items-center h-full'>
      <section className='flex flex-col items-center w-1/3'>
        <div className='flex flex-col p-8'>
          <Link
            href={urlPaths.home}
            className='my-10 self-center'>
            <Logo
              title='ETool'
              size='40px'
            />
          </Link>
          <h1 className='text-3xl font-semibold text-center'>Welcome back!</h1>
          <p className='text-sm text-muted-foreground my-4'>Sing into ETool with credentials or socials providers.</p>
          <LoginForm />
          <Button
            className='mt-4'
            variant='secondary'>
            <GitHubLogoIcon className='w-6 h-6 mr-2' />
            Continue with Github
          </Button>
          <Button
            className='mt-4'
            variant='secondary'>
            <LinkedInLogoIcon className='w-6 h-6 mr-2' />
            Continue with LinkedIn
          </Button>
          <Link
            className='my-2 text-sm text-center text-foreground/60 hover:text-foreground/80'
            href={urlPaths.register}>
            Dont have account? <strong>Create one here.</strong>
          </Link>
        </div>
      </section>
      <div className='flex items-center justify-center w-2/3 h-full p-4'>
        <aside className='flex flex-col items-center justify-center w-full h-full border border-transparent  rounded-xl bg-gray-100 dark:bg-neutral-900'>
          <h2 className='w-1/2 text-3xl my-4'>ETool is the first online assistant to help you effectively manage repairs in your workshop!</h2>
          <p className='flex items-center text-foreground/60 text-xl'>
            Created by <GitHubLogoIcon className='mx-2' />
            <Link
              className='underline text-foreground/60 hover:text-foreground/80'
              href={githubProfileUrl}>
              chrzanowskikamil
            </Link>
          </p>
        </aside>
      </div>
    </main>
  );
}
