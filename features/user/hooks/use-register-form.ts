import { toast } from 'sonner';
import { urlPaths } from '@/utils/paths';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { REGISTER_DEFAULT_VALUES, REGISTER_FORM_SCHEMA } from '../schemas/register-form-schema';
import { signUpUser } from '../actions/sign-up-user';

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
      router.push(urlPaths.dashboard);
    }
  }

  return { form, onSubmit };
}
