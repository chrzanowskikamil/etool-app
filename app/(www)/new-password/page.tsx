import NewPasswordForm from '@/features/user/components/new-password-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default async function NewPasswordPage() {
  return (
    <main className='flex flex-col items-center container'>
      <Card className='my-16 sm:w-3/4 md:w-1/3 md:my-48 md:h-1/2'>
        <CardHeader>
          <CardTitle className='text-3xl font-medium text-center p-2'>New Password</CardTitle>
          <CardDescription className='text-center'>Password must be at least 8 characters long</CardDescription>
        </CardHeader>
        <CardContent>
          <NewPasswordForm />
        </CardContent>
      </Card>
    </main>
  );
}
