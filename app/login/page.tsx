import Link from 'next/link';
import LoginForm from '../../components/login-form';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ROUTES } from '@/lib/routes';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

export default async function LoginPage() {
  const session = await getServerSession();
  if (session) {
    redirect(ROUTES.DASHBOARD);
  }

  return (
    <main className='flex flex-col items-center container'>
      <Card className='my-16 sm:w-3/4 md:w-1/3 md:my-48 md:h-1/2'>
        <CardHeader>
          <h1 className='text-3xl font-medium text-center p-2 '>Welcome back!</h1>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter>
          <Link
            className='mx-auto text-sm text-foreground/60 hover:text-foreground/80 '
            href={ROUTES.REGISTER}>
            No account? <strong>Join now!</strong>
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
