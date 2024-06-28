'use client';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { LoadingSpinner } from '@/components/icons';
import { useEmailVerificationForm } from '../hooks/use-email-verification-form';
import { Button } from '@/components/ui/button';
import { User } from 'lucia';
import { sendVerificationEmailCode } from '@/features/email/actions/send-verification-email-code';
import { useRouter } from 'next/navigation';
import { urlPaths } from '@/utils/paths';
import { toast } from 'sonner';

interface EmailVerificationFormProps {
  user: User | null;
}

export function EmailVerificationForm({ user }: EmailVerificationFormProps) {
  const { form, onSubmit } = useEmailVerificationForm();
  const { isSubmitting } = form.formState;
  const router = useRouter();

  if (!user) {
    router.push(urlPaths.login);
    return null;
  }

  const handleResedVericationCode = async () => {
    await sendVerificationEmailCode(user.username);
    toast.success('Verification code sent', { description: 'We sent you a new verification code to your email.' });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-4'>
        <FormField
          control={form.control}
          name='code'
          render={({ field }) => (
            <FormItem className='flex flex-col items-center'>
              <FormLabel>Code</FormLabel>
              <FormControl>
                <InputOTP
                  maxLength={4}
                  onComplete={form.handleSubmit(onSubmit)}
                  {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
              <FormDescription>Please enter the code sent to your mailbox.</FormDescription>
              <FormDescription>
                Did you not recive the code or is it expired?
                <Button
                  type='button'
                  className='p-1'
                  variant='link'
                  onClick={() => handleResedVericationCode()}>
                  Resend
                </Button>
              </FormDescription>
              {isSubmitting && <LoadingSpinner />}
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
