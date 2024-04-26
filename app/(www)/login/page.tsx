import Link from 'next/link';
import LoginForm from '@/components/login-form';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ROUTES } from '@/utils';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';

export default async function LoginPage() {
  const { user } = await getSession();

  if (user) {
    redirect(ROUTES.DASHBOARD);
  }

  return (
    <main className='flex flex-col items-center container'>
      <Card className='my-16 sm:w-3/4 md:w-1/3 md:my-48 md:h-1/2'>
        <CardHeader>
          <CardTitle className='text-3xl font-medium text-center p-2 '>Welcome back!</CardTitle>
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
