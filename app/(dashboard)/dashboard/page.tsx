import { Sidebar } from '@/components/sidebar';
import { validateRequest } from '@/lib/auth';
import { ROUTES } from '@/lib/routes';
import { redirect } from 'next/navigation';

export default async function DashboardPage(): Promise<JSX.Element> {
  const { user } = await validateRequest();

  if (!user) {
    redirect(ROUTES.LOGIN);
  }

  return (
    <main className='flex'>
      <div className='flex w-screen flex-col gap-6 justify-center items-center'>
        <h1>Dashboard</h1>
        <p>
          Logged as: <strong>{user.username}</strong>
        </p>
      </div>
    </main>
  );
}
