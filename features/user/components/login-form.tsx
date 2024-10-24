'use client';
import { Button } from '@/components/ui/button';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { LoadingSpinner } from '@/components/icons';
import { urlPaths } from '@/utils/paths';
import { useLoginForm } from '@/features/user/hooks/use-login-form';
import { useState } from 'react';

export function LoginForm() {
  const { form, onSubmit } = useLoginForm();
  const { isSubmitting } = form.formState;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const handlePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  return (
    <Form {...form}>
      <form
        className='flex flex-col gap-4'
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
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel form='password'>Password</FormLabel>
              <FormControl>
                <div className='flex w-full max-w-sm items-center space-x-2'>
                  <Input
                    autoCapitalize='off'
                    disabled={isSubmitting}
                    id='password'
                    type={isPasswordVisible ? 'text' : 'password'}
                    placeholder='********'
                    {...field}
                  />
                  <Button
                    onClick={handlePasswordVisibility}
                    type='button'
                    variant={'outline'}>
                    {isPasswordVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
              <FormDescription>
                <Link
                  className='text-xs text-foreground/60 hover:text-foreground/80 '
                  href={urlPaths.resetPassword}>
                  Forgot password?
                </Link>
              </FormDescription>
            </FormItem>
          )}
        />
        <Button type='submit'>Submit {isSubmitting ? <LoadingSpinner /> : null}</Button>
      </form>
    </Form>
  );
}
