import { REGISTER_FORM_SCHEMA, REGISTER_DEFAULT_VALUES } from '@/schemas/register-form-schema';
import { ROUTES } from '@/lib/routes';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { registerUser } from '@/services/auth-service';

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
      const response = await registerUser(values);
      console.log(response);
      toast({
        title: 'Account created',
        description: response.message,
      });
      return response;
    } catch (error) {
      console.log(error.message);
    }
  }

  return { form, onSubmit };
}
