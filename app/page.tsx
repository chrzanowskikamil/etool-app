import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/navbar';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className='container flex items-center justify-center min-h-screen'>
        <div className='flex-col text-center'>
          <h2 className='text-2xl font-bold text-center'>Discover the Power of ETool</h2>
          <p className='text-center'>Efficiently manage your repairs with our advanced features.</p>
          <Button
            className='mt-6'
            variant='outline'
            size='lg'
            disabled>
            Get Started
          </Button>
        </div>
      </main>
    </>
  );
}
