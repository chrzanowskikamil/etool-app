import { getSession } from '@/lib/auth/get-session';
import Link from 'next/link';
import { Logo } from '@/components/logo';
import { OAuthProvidersButtons } from '@/features/user/components/oauth-providers-buttons';
import { redirect } from 'next/navigation';
import RegisterForm from '@/features/user/components/register-form';
import { urlPaths } from '@/utils/paths';

export default async function RegisterPage() {
  const { user } = await getSession();

  if (user) {
    redirect(urlPaths.dashboard);
  }

  return (
    <main className='flex justify-center items-center h-full animate-in slide-in-from-left-96 '>
      <section className='flex flex-col p-8 w-[500px]'>
        <Link
          href={urlPaths.home}
          className='hidden lg:block my-8 self-center'>
          <Logo
            title='ETool'
            size='40px'
          />
        </Link>
        <h1 className='text-3xl font-semibold text-center'>Get started</h1>
        <p className='text-sm text-muted-foreground my-4'>Create your ETool account by signing in with credentials or providers.</p>
        <RegisterForm />
        <OAuthProvidersButtons />
        <Link
          className='my-2 text-sm text-center text-foreground/60 hover:text-foreground/80'
          href={urlPaths.login}>
          Already have an account? <strong>Log in</strong>
        </Link>
      </section>
    </main>
  );
}
