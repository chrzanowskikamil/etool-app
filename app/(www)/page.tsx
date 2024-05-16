import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { urlPaths } from '@/utils/paths';

export default async function HomePage() {
  return (
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
  );
}
