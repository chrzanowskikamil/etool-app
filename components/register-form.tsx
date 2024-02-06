'use client';

import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './ui/button';
import { LoadingSpinner } from './icons';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/routes';
import { useToast } from './ui/use-toast';

export default function RegisterForm() {
  const router = useRouter();
  const { toast } = useToast();
  const registerFormSchema = z.object({
    firstName: z.string().min(2, { message: 'First name must be at least 2 characters long' }).max(30),
    lastName: z.string().min(2, { message: 'Last name must be at least 2 characters long' }).max(50),
    email: z.string().email(),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }).max(100),
  });

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    mode: 'onTouched',
    delayError: 300,
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    const response = await fetch('api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      }),
    });

    if (!response.ok) {
      throw new Error('An error occurred while registering');
    } else {
      console.log('User registered successfully');
      router.push(ROUTES.DASHBOARD);
      router.refresh();

      toast({
        title: 'Registration successful',
        description: 'You have successfully registered!',
        duration: 6000,
      });
    }
  }

  return (
    <Form {...form}>
      <form
        className='flex flex-col gap-6'
        onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='firstName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  autoCapitalize='off'
                  autoComplete='firstName'
                  autoCorrect='off'
                  disabled={isSubmitting}
                  id='firstName'
                  placeholder='John'
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
          name='lastName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input
                  autoCapitalize='off'
                  autoComplete='lastName'
                  autoCorrect='off'
                  disabled={isSubmitting}
                  id='lastName'
                  placeholder='Doe'
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
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  autoCapitalize='off'
                  autoComplete='email'
                  autoCorrect='off'
                  disabled={isSubmitting}
                  id='email'
                  placeholder='name@mail.com'
                  type='email'
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
                <Input
                  autoCapitalize='off'
                  disabled={isSubmitting}
                  id='password'
                  type='password'
                  placeholder='********'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Register {isSubmitting ? <LoadingSpinner /> : null}</Button>
      </form>
    </Form>
  );
}
