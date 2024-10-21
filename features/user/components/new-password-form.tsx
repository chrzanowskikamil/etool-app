'use client';
import { Button } from '@/components/ui/button';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoadingSpinner } from '@/components/icons';
import { useNewPasswordForm } from '@/features/user/hooks/use-new-password-form';
import { useState } from 'react';

export function NewPasswordForm() {
  const { form, onSubmit } = useNewPasswordForm();
  const { isSubmitting } = form.formState;
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const handleConfirmPasswordVisibility = () => setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  const handlePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

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
                    type={isPasswordVisible ? 'text' : 'password'}
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
                    type={isConfirmPasswordVisible ? 'text' : 'password'}
                    {...field}
                  />
                  <Button
                    onClick={handleConfirmPasswordVisibility}
                    type='button'
                    variant={'outline'}>
                    {isConfirmPasswordVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
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
