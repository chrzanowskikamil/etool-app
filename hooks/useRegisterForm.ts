import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

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
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });

  console.log(response);

  if (response.ok) {
    console.log('redirect nastapi');
  } else {
    console.log('Failed to register');
  }
}

export function useRegisterForm() {
  const router = useRouter();
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
