'use client';

import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { LoadingSpinner } from './icons';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { useNewPasswordForm } from '@/hooks/use-new-password-form';
import { useState } from 'react';

export default function NewPasswordForm() {
  const { form, onSubmit } = useNewPasswordForm();
  const { isSubmitting } = form.formState;
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleShowPassword = () => setPasswordVisible(!passwordVisible);
  const handleShowConfirmPassword = () => setConfirmPasswordVisible(!confirmPasswordVisible);

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
                <div className='flex w-full max-w-sm items-center space-x-2'>
                  <Input
                    autoCapitalize='off'
                    autoComplete='new-password'
                    autoCorrect='off'
                    disabled={isSubmitting}
                    id='password'
                    placeholder='********'
                    type={passwordVisible ? 'text' : 'password'}
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
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <div className='flex w-full max-w-sm items-center space-x-2'>
                  <Input
                    autoCapitalize='off'
                    autoComplete='new-password'
                    autoCorrect='off'
                    disabled={isSubmitting}
                    id='confirmPassword'
                    placeholder='********'
                    type={confirmPasswordVisible ? 'text' : 'password'}
                    {...field}
                  />
                  <Button
                    onClick={handleShowConfirmPassword}
                    type='button'
                    variant={'outline'}>
                    {confirmPasswordVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
                  </Button>
                </div>
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
