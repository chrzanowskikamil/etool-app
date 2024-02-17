import { LogoutButton } from '@/components/logout-button';
import { Sidebar } from '@/components/sidebar';
import { validateRequest } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage(): Promise<JSX.Element> {
  const { user } = await validateRequest();
  console.log(`User from dashboard page: ${JSON.stringify(user)}`);

  if (!user) {
    redirect('/login');
  }
  return (
    <main className='flex'>
      <Sidebar />
      <div className='flex flex-col gap-6'>
        <h1>Dashboard</h1>
        <p>Logged user: {user.username}</p>
        <LogoutButton />
      </div>
    </main>
  );
}
