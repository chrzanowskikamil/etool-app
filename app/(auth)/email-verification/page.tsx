import { EmailVerificationForm } from '@/features/user/components/email-verification-form';
import Link from 'next/link';
import { Logo } from '@/components/logo';
import { urlPaths } from '@/utils/paths';
import { getSession } from '@/lib/auth/get-session';
import { redirect } from 'next/navigation';

export default async function EmailVerificationPage() {
  const { user } = await getSession();
  if (!user) redirect(urlPaths.login);
  if (user.emailVerified) redirect(urlPaths.dashboard);

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
        <h1 className='text-3xl font-semibold text-center'>Verify your email address</h1>
        <p className='text-sm text-muted-foreground my-4'>Take a look at your inbox, we sent you an email with the verification code.</p>
        <EmailVerificationForm user={user} />
      </section>
    </main>
  );
}
