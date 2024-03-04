import { NEW_PASSWORD_DEFAULT_VALUES, NEW_PASSWORD_FORM_SCHEMA } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export function useNewPasswordForm() {
  const DELAY_ERROR = 300;

  const form = useForm<z.infer<typeof NEW_PASSWORD_FORM_SCHEMA>>({
    resolver: zodResolver(NEW_PASSWORD_FORM_SCHEMA),
    defaultValues: NEW_PASSWORD_DEFAULT_VALUES,
    mode: 'onTouched',
    delayError: DELAY_ERROR,
  });

  async function onSubmit(value: z.infer<typeof NEW_PASSWORD_FORM_SCHEMA>) {
    const verificationToken = new URLSearchParams(window.location.search).get('token');
    const response = await fetch('/api/auth/new-password/', {
      method: 'POST',
      body: JSON.stringify({ value, verificationToken }),
    });

    const data = await response.json();
    console.log(data);
  }

  return { form, onSubmit };
}
