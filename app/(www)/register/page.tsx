import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import RegisterForm from '@/components/register-form';
import Link from 'next/link';
import { ROUTES } from '@/lib/routes';

export default async function RegisterPage() {
  return (
    <main className='flex flex-col items-center container'>
      <Card className='my-16 sm:w-3/4 md:w-1/3 md:my-36 md:h-1/2'>
        <CardHeader>
          <h1 className='text-3xl font-medium text-center p-2'>Get started for free</h1>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
        <CardFooter>
          <Link
            className='mx-auto text-sm text-foreground/60 hover:text-foreground/80 '
            href={ROUTES.LOGIN}>
            Already have an account? <strong>Log in</strong>
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
