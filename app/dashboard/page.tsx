import { getServerSession } from 'next-auth';

async function getUser() {
  const session = await getServerSession();
  return session?.user?.email;
}

export default async function DashboardPage() {
  const user = await getUser();
  return <div>private dashboard page - only logged users can see this page. USER: {user} </div>;
}
