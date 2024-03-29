'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { ROUTES } from '@/lib/routes';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { LoadingSpinner } from './icons';
import { useState } from 'react';
import { useLoginForm } from '@/hooks/use-login-form';

export default function LoginForm() {
  const { form, onSubmit } = useLoginForm();
  const { isSubmitting } = form.formState;
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleShowPassword = () => setPasswordVisible(!passwordVisible);

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
                    type={passwordVisible ? 'text' : 'password'}
                    placeholder='********'
                    {...field}
                  />
                  <Button
                    onClick={handleShowPassword}
                    type='button'
                    variant={'outline'}>
                    {passwordVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
              <FormDescription>
                <Link
                  className='text-xs text-foreground/60 hover:text-foreground/80 '
                  href={ROUTES.RESET_PASSWORD}>
                  Forgot password?
                </Link>
              </FormDescription>
            </FormItem>
          )}
        />
        <Button type='submit'>Login {isSubmitting ? <LoadingSpinner /> : null}</Button>
      </form>
    </Form>
  );
}
