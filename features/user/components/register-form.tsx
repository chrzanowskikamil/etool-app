'use client';
import { Button } from '../../../components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../components/ui/form';
import { Input } from '../../../components/ui/input';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { LoadingSpinner } from '../../../components/icons';
import { useRegisterForm } from '@/features/user/hooks/use-register-form';
import { useState } from 'react';

export default function RegisterForm() {
  const { form, onSubmit } = useRegisterForm();
  const { isSubmitting } = form.formState;
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleShowPassword = () => setPasswordVisible(!passwordVisible);

  return (
    <Form {...form}>
      <form
        className='flex flex-col gap-4'
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
            </FormItem>
          )}
        />
        <Button type='submit'>Register {isSubmitting ? <LoadingSpinner /> : null}</Button>
      </form>
    </Form>
  );
}
