import { z } from 'zod';
import { RESET_PASSWORD_DEFAULT_VALUES, RESET_PASSWORD_FORM_SCHEMA } from '@/schemas/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { ENDPOINTS } from '@/lib/routes';

export function useResetPasswordForm() {
  const DELAY_ERROR = 300;

  const form = useForm<z.infer<typeof RESET_PASSWORD_FORM_SCHEMA>>({
    resolver: zodResolver(RESET_PASSWORD_FORM_SCHEMA),
    defaultValues: RESET_PASSWORD_DEFAULT_VALUES,
    mode: 'onTouched',
    delayError: DELAY_ERROR,
  });

  const { setError } = form;

  async function onSubmit(value: z.infer<typeof RESET_PASSWORD_FORM_SCHEMA>) {
    try {
      const response = await fetch(ENDPOINTS.RESET_PASSWORD, {
        method: 'POST',
        body: JSON.stringify(value),
      });

      const data = await response.json();

      if (data.status === 201) {
        toast.success(data.message, { description: data.description });
      }
      if (data.status === 400) {
        setError('username', { type: 'manual', message: data.description });
        toast.error(data.message, { description: data.description });
      }
    } catch (error) {
      console.log(error);
    }
  }
  return { form, onSubmit };
}
