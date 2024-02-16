import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { redirect, useRouter } from 'next/navigation';
import { NextResponse } from 'next/server';
import { useToast } from '@/components/ui/use-toast';
import { ROUTES } from '@/lib/routes';

export function useRegisterForm() {
  const router = useRouter();
  const { toast } = useToast();

  const defaultValues = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
  };

  const registerFormSchema = z.object({
    firstName: z.string().min(2, { message: 'First name must be at least 2 characters long' }).max(30),
    lastName: z.string().min(2, { message: 'Last name must be at least 2 characters long' }).max(50),
    username: z.string().email(),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }).max(100),
  });

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data: NextResponse = await response.json();
      console.log(data);

      if (data.status === 401) {
        toast({
          title: 'Username already taken',
          description: 'Please choose a different username',
          variant: 'destructive',
        });
        console.log('Failed to register');
      } else {
        console.log('redirect nastapi');
        router.push(ROUTES.HOME);
        toast({
          title: 'Account created',
          description: 'You have successfully created an account',
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues,
    mode: 'onTouched',
    delayError: 300,
  });

  const {
    formState: { isSubmitting },
  } = form;

  return { form, isSubmitting, onSubmit };
}
