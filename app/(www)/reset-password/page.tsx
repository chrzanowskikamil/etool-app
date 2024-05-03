import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ResetPasswordForm from '@/features/user/components/reset-password-form';

export default function ResetPasswordPage() {
  return (
    <main className='container flex justify-center'>
      <Card className='my-16 sm:w-3/4 md:w-1/3 md:my-48 md:h-1/2'>
        <CardHeader>
          <CardTitle className='text-3xl font-medium text-center p-4'>Forgot your password?</CardTitle>
          <CardDescription className=' text-pretty'>Need to reset your password? No problem! Just type email below and we will send you the instructions.</CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm />
        </CardContent>
      </Card>
    </main>
  );
}
