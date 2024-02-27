'use client';

import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { LoadingSpinner } from './icons';
import { Input } from './ui/input';
import { ROUTES } from '@/lib/routes';
import { useRouter } from 'next/navigation';
import { useResetPasswordForm } from '@/hooks/use-reset-password-form';

export default function ResetPasswordForm() {
  const { form, onSubmit } = useResetPasswordForm();
  const { isSubmitting } = form.formState;
  const router = useRouter();

  return (
    <Form {...form}>
      <form
        className='flex flex-col gap-6'
        onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  autoCapitalize='off'
                  autoComplete='email'
                  autoCorrect='off'
                  disabled={isSubmitting}
                  id='username'
                  placeholder='name@mail.com'
                  type='text'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-between'>
          <Button
            variant='outline'
            type='button'
            onClick={() => router.push(ROUTES.LOGIN)}>
            Back
          </Button>
          <Button type='submit'>Reset Password {isSubmitting ? <LoadingSpinner /> : null}</Button>
        </div>
      </form>
    </Form>
  );
}
