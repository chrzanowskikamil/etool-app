import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { urlPaths } from '@/utils/paths';
import { getSession } from '@/lib/auth/get-session';

export default async function HomePage() {
  const { user } = await getSession();

  return (
    <>
      <Navbar user={user} />
      <main className='flex items-center justify-center min-h-full'>
        <div className='flex-col text-center'>
          <h2 className='text-2xl font-bold text-center'>Discover the Power of ETool</h2>
          <p className='text-center pb-5'>Efficiently manage your repairs with our advanced features.</p>
          <Link
            href={urlPaths.register}
            className={buttonVariants({ variant: 'outline', size: 'lg' })}>
            Get Started
          </Link>
        </div>
      </main>
    </>
  );
}
