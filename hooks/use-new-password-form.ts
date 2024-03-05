import { z } from 'zod';
import { ENDPOINTS, ROUTES } from '@/lib/routes';
import { NEW_PASSWORD_DEFAULT_VALUES, NEW_PASSWORD_FORM_SCHEMA } from '@/schemas/auth';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export function useNewPasswordForm() {
  const DELAY_ERROR = 300;
  const router = useRouter();

  const form = useForm<z.infer<typeof NEW_PASSWORD_FORM_SCHEMA>>({
    resolver: zodResolver(NEW_PASSWORD_FORM_SCHEMA),
    defaultValues: NEW_PASSWORD_DEFAULT_VALUES,
    mode: 'onTouched',
    delayError: DELAY_ERROR,
  });

  async function onSubmit(value: z.infer<typeof NEW_PASSWORD_FORM_SCHEMA>) {
    const verificationToken = new URLSearchParams(window.location.search).get('token');
    try {
      const response = await fetch(ENDPOINTS.NEW_PASSWORD, {
        method: 'POST',
        body: JSON.stringify({ value, verificationToken }),
      });

      const data = await response.json();

      if (data.status === 200) {
        toast.success(data.message, { description: data.description });
        router.push(ROUTES.LOGIN);
      }

      if (data.status === 400) {
        toast.error(data.message, { description: data.description });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return { form, onSubmit };
}
