import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <p className='text-4xl font-bold underline'>homepage</p>
      <Link href={'/register'}>REGISTER</Link>
      <Link href={'/dashboard'}>go to DASHBOARD</Link>
    </main>
  );
}
