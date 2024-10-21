'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { LoadingSpinner } from '@/components/icons';
import { resendVerificationCode } from '../utils/resend-verification-code';
import { useEmailVerificationForm } from '../hooks/use-email-verification-form';
import { User } from 'lucia';

interface EmailVerificationFormProps {
  user: User;
}

export function EmailVerificationForm({ user }: EmailVerificationFormProps) {
  const { form, onSubmit } = useEmailVerificationForm();
  const { isSubmitting } = form.formState;
  const VERIFICATION_CODE_LENGTH = 4;

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
                  maxLength={VERIFICATION_CODE_LENGTH}
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
                  onClick={() => resendVerificationCode(user)}>
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
