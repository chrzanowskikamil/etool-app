'use client';

import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { LoadingSpinner } from './icons';
import { useNewPasswordForm } from '@/hooks/use-new-password-form';

export default function NewPasswordForm() {
  const { form, onSubmit } = useNewPasswordForm();
  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form
        className='flex flex-col gap-6'
        onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input
                  autoCapitalize='off'
                  autoComplete='new-password'
                  autoCorrect='off'
                  disabled={isSubmitting}
                  id='password'
                  placeholder='********'
                  type='password'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input
                  autoCapitalize='off'
                  autoComplete='new-password'
                  autoCorrect='off'
                  disabled={isSubmitting}
                  id='confirmPassword'
                  placeholder='********'
                  type='password'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Change password {isSubmitting ? <LoadingSpinner /> : null}</Button>
      </form>
    </Form>
  );
}
