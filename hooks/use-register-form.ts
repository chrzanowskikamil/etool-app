import z from 'zod';
import { REGISTER_FORM_SCHEMA, REGISTER_DEFAULT_VALUES } from '@/schemas/form-schemas';
import { ROUTES } from '@/utils';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { signUpUser } from '@/lib/user';

export function useRegisterForm() {
  const router = useRouter();
  const DELAY_ERROR = 300;

  const form = useForm<z.infer<typeof REGISTER_FORM_SCHEMA>>({
    resolver: zodResolver(REGISTER_FORM_SCHEMA),
    defaultValues: REGISTER_DEFAULT_VALUES,
    mode: 'onTouched',
    delayError: DELAY_ERROR,
  });

  const { setError } = form;

  async function onSubmit(values: z.infer<typeof REGISTER_FORM_SCHEMA>) {
    const { success, error, message } = await signUpUser(values);

    if (error) {
      setError('username', { message });
      toast.error(error, { description: message });
    }

    if (success) {
      toast.success(success, { description: message });
      router.push(ROUTES.DASHBOARD);
    }
  }

  return { form, onSubmit };
}
