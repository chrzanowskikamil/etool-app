'use client';

import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ROUTES } from '@/lib/routes';
import Link from 'next/link';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { LoadingSpinner } from './icons';
import { useToast } from './ui/use-toast';

export default function LoginForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const loginFormSchema = z.object({
    username: z.string().email(),
    password: z.string().min(4, { message: 'Password must be at least 8 characters long' }).max(100),
  });
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onTouched',
    delayError: 300,
  });

  const {
    formState: { isSubmitting },
    setError,
  } = form;

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    //     const response = await signIn('credentials', {
    //       email: values.email as string,
    //       password: values.password as string,
    //       // redirect: false,
    //       callbackUrl: ROUTES.DASHBOARD,
    //     });
    //
    //     console.log(response);
    //
    //     if (response?.error) {
    //       setError('email', { type: 'manual', message: 'Your email or password is incorrect. Please try again.' });
    //       setError('password', { type: 'manual', message: 'Your email or password is incorrect. Please try again.' });
    //     } else {
    //       toast({
    //         title: 'Login successful',
    //         description: 'You have successfully logged in!',
    //         duration: 6000,
    //       });
    //     }
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.status === 401) {
        setError('username', { type: 'manual', message: 'Your email or password is incorrect. Please try again.' });
        setError('password', { type: 'manual', message: 'Your email or password is incorrect. Please try again.' });
      }

      if (data.status === 200) {
        router.push(ROUTES.DASHBOARD);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

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
