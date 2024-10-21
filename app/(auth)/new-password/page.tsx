import Link from 'next/link';
import { Logo } from '@/components/logo';
import { NewPasswordForm } from '@/features/user/components/new-password-form';
import { urlPaths } from '@/utils/paths';

export default async function NewPasswordPage() {
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
        <h1 className='text-3xl font-semibold text-center'>New Password</h1>
        <p className='text-sm text-muted-foreground my-4'>Password must be at least 8 characters long.</p>
        <NewPasswordForm />
      </section>
    </main>
  );
}
