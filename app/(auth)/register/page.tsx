import { getSession } from '@/lib/auth/get-session';
import Link from 'next/link';
import RegisterForm from '@/features/user/components/register-form';
import { redirect } from 'next/navigation';
import { urlPaths } from '@/utils/paths';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';

export default async function RegisterPage() {
  const { user } = await getSession();

  if (user) {
    redirect(urlPaths.dashboard);
  }

  return (
    <main className='flex justify-center items-center h-full'>
      <section className='flex flex-col p-8 w-[500px]'>
        <Link
          href={urlPaths.home}
          className='my-8 self-center'>
          <Logo
            title='ETool'
            size='40px'
          />
        </Link>
        <h1 className='text-3xl font-semibold text-center'>Get started</h1>
        <p className='text-sm text-muted-foreground my-4'>Create your ETool account by signing in with credentials or providers.</p>
        <RegisterForm />
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
          href={urlPaths.login}>
          Already have an account? <strong>Log in</strong>
        </Link>
      </section>
    </main>
  );
}
