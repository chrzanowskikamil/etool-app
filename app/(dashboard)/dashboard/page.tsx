import { Sidebar } from '@/components/sidebar';
import { getSession } from '@/lib/session';
import { ROUTES } from '@/utils';

import { redirect } from 'next/navigation';

export default async function DashboardPage(): Promise<JSX.Element> {
  const { user } = await getSession();

  if (!user) {
    redirect(ROUTES.LOGIN);
  }

  return (
    <main className='flex'>
      <Sidebar />
      <div className='flex w-screen flex-col gap-6 justify-center items-center'>
        <h1>Dashboard</h1>
        <p>
          Logged as: <strong>{user.username}</strong>
        </p>
      </div>
    </main>
  );
}
