import { Sidebar } from '@/components/sidebar';
import { getServerSession } from 'next-auth';

async function getUser() {
  const session = await getServerSession();
  return session?.user?.email;
}

export default async function DashboardPage() {
  const user = await getUser();
  return (
    <div className='flex'>
      <Sidebar />
      private dashboard page - only logged users can see this page. USER: {user}
    </div>
  );
}
