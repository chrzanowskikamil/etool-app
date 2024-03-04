'use client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { useNewPasswordForm } from '@/hooks/use-new-password-form';
import { Input } from './ui/input';
import { Button } from './ui/button';

export default function NewPasswordForm() {
  const { form, onSubmit } = useNewPasswordForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
        <Button type='submit'>Change password</Button>
      </form>
    </Form>
  );
}
