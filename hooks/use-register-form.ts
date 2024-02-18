import z from 'zod';
import { REGISTER_FORM_SCHEMA, REGISTER_DEFAULT_VALUES } from '@/schemas/auth';
import { ROUTES, ENDPOINTS } from '@/lib/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

export function useRegisterForm() {
  const router = useRouter();
  const { toast } = useToast();
  const DELAY_ERROR = 300;

  const form = useForm<z.infer<typeof REGISTER_FORM_SCHEMA>>({
    resolver: zodResolver(REGISTER_FORM_SCHEMA),
    defaultValues: REGISTER_DEFAULT_VALUES,
    mode: 'onTouched',
    delayError: DELAY_ERROR,
  });

  async function onSubmit(values: z.infer<typeof REGISTER_FORM_SCHEMA>) {
    try {
      const response = await fetch(ENDPOINTS.REGISTER, {
        method: 'POST',
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.status === 201) {
        toast({
          title: data.message,
          description: data.description,
        });
        router.push(ROUTES.DASHBOARD);
      }

      if (data.status === 409) {
        toast({
          title: data.message,
          description: data.description,
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return { form, onSubmit };
}