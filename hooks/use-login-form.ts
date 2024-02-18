import z from 'zod';
import { LOGIN_DEFAULT_VALUES, LOGIN_FORM_SCHEMA } from '@/schemas/auth';
import { ENDPOINTS, ROUTES } from '@/lib/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

export function useLoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const DELAY_ERROR = 300;

  const form = useForm<z.infer<typeof LOGIN_FORM_SCHEMA>>({
    resolver: zodResolver(LOGIN_FORM_SCHEMA),
    defaultValues: LOGIN_DEFAULT_VALUES,
    mode: 'onTouched',
    delayError: DELAY_ERROR,
  });

  const { setError } = form;

  async function onSubmit(values: z.infer<typeof LOGIN_FORM_SCHEMA>) {
    try {
      const response = await fetch(ENDPOINTS.LOGIN, {
        method: 'POST',
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.status === 201) {
        router.push(ROUTES.DASHBOARD);
        toast({
          title: data.message,
          description: data.description,
        });
      }

      if (data.status === 409) {
        setError('username', { type: 'manual', message: data.description });
      }

      if (data.status === 401) {
        setError('password', { type: 'manual', message: data.description });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return { form, onSubmit };
}
