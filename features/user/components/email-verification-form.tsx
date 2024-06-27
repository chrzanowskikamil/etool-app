'use client';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { LoadingSpinner } from '@/components/icons';
import { useEmailVerificationForm } from '../hooks/use-email-verification-form';

export function EmailVerificationForm() {
  const { form, onSubmit } = useEmailVerificationForm();
  const { isSubmitting } = form.formState;

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
              <FormDescription>Please enter the code sent to your mailbox.</FormDescription>
              {isSubmitting && <LoadingSpinner />}
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
