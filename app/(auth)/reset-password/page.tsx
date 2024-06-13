import Link from 'next/link';
import { Logo } from '@/components/logo';
import ResetPasswordForm from '@/features/user/components/reset-password-form';
import { urlPaths } from '@/utils/paths';

export default function ResetPasswordPage() {
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
        <h1 className='text-3xl font-semibold text-center'>Forgot your password?</h1>
        <p className='text-sm text-muted-foreground my-4'>Need to reset your password? No problem! Just type email below and we will send you the instructions.</p>
        <ResetPasswordForm />
      </section>
    </main>
  );
}
