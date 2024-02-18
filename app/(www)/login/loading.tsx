import { LoadingSpinner } from '@/components/icons';
import { Navbar } from '@/components/navbar';

export default function Loading() {
  return (
    <main className='flex flex-col w-screen h-screen'>
      <Navbar />
      <div className='flex flex-1 justify-center items-center'>
        <h1 className='text-2xl opacity-50 p-4'>Please wait</h1>
        <LoadingSpinner />
      </div>
    </main>
  );
}
