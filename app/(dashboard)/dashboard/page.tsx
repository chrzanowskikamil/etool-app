import { Sidebar } from '@/components/sidebar';

export default async function DashboardPage() {
  return (
    <div className='flex'>
      <Sidebar />
      private dashboard page - only logged users can see this page.
    </div>
  );
}
