import { buttonVariants } from '@/components/ui/button';
import { getSession } from '@/lib/auth/get-session';
import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { Logo } from '@/components/logo';
import LoginForm from '@/features/user/components/login-form';
import { redirect } from 'next/navigation';
import { urlPaths } from '@/utils/paths';

export default async function LoginPage() {
  const { user } = await getSession();

  if (user) {
    redirect(urlPaths.dashboard);
  }

  return (
    <main className='flex justify-center items-center h-full animate-in slide-in-from-left-96'>
      <section className='flex flex-col w-[500px] p-8'>
        <Link
          href={urlPaths.home}
          className='hidden lg:block my-8 self-center'>
          <Logo
            title='ETool'
            size='40px'
          />
        </Link>
        <h1 className='text-3xl font-semibold text-center'>Welcome back!</h1>
        <p className='text-sm text-muted-foreground my-4'>Sing into ETool with credentials or socials providers.</p>
        <LoginForm />
        <Link
          href={urlPaths.githubAuth}
          className={buttonVariants({ variant: 'secondary', size: 'lg', className: 'mt-4' })}>
          <GitHubLogoIcon className='w-6 h-6 mr-2' />
          Continue with Github
        </Link>
        <Link
          href={urlPaths.linkedInAuth}
          className={buttonVariants({ variant: 'secondary', size: 'lg', className: 'mt-4' })}>
          <LinkedInLogoIcon className='w-6 h-6 mr-2' />
          Continue with LinkedIn
        </Link>
        <Link
          className='my-2 text-sm text-center text-foreground/60 hover:text-foreground/80'
          href={urlPaths.register}>
          Dont have account? <strong>Create one here.</strong>
        </Link>
      </section>
    </main>
  );
}
