import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/sidebar';
import { urlPaths } from '@/utils/paths';
import { getSession } from '@/lib/auth/get-session';

export default async function DashboardPage(): Promise<JSX.Element> {
  const { user } = await getSession();

  if (!user) {
    redirect(urlPaths.login);
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
