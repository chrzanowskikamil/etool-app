import { redirect } from 'next/navigation';
import { urlPaths } from '@/utils/paths';
import { getSession } from '@/lib/auth/get-session';
import { Navbar } from '@/components/navbar';
import Dashboard from '@/features/dashboard/components/dashboard';

export default async function DashboardPage(): Promise<JSX.Element> {
  const { user } = await getSession();

  if (!user) {
    redirect(urlPaths.login);
  }

  return (
    <main className='flex-col'>
      <Dashboard />
    </main>
  );
}
