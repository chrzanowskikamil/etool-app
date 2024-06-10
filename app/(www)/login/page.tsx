import { AuthHero } from '@/components/auth-hero';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import LoginForm from '@/features/user/components/login-form';
import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';
import { getSession } from '@/lib/auth/get-session';
import { urlPaths } from '@/utils/paths';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function LoginPage() {
  const { user } = await getSession();

  if (user) {
    redirect(urlPaths.dashboard);
  }

  return (
    <main className='flex items-center h-full'>
      <section className='flex flex-col p-8 w-1/3'>
        <Link
          href={urlPaths.home}
          className='my-8 self-center'>
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
      </section>
      <AuthHero />
    </main>
  );
}
