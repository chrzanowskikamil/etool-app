import z from 'zod';
import { LOGIN_DEFAULT_VALUES, LOGIN_FORM_SCHEMA } from '@/schemas/form-schemas';
import { ROUTES } from '@/utils';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { signIn } from '@/server/actions/auth/sign-in';

export function useLoginForm() {
  const router = useRouter();
  const DELAY_ERROR = 300;

  const form = useForm<z.infer<typeof LOGIN_FORM_SCHEMA>>({
    resolver: zodResolver(LOGIN_FORM_SCHEMA),
    defaultValues: LOGIN_DEFAULT_VALUES,
    mode: 'onTouched',
    delayError: DELAY_ERROR,
  });

  const { setError } = form;

  async function onSubmit(values: z.infer<typeof LOGIN_FORM_SCHEMA>) {
    const { error, success, message, isPasswordValid, isUserExist } = await signIn(values);

    if (isUserExist) {
      setError('username', { message });
      toast.error(error, { description: message });
    }

    if (isPasswordValid) {
      setError('password', { message });
      toast.error(error, { description: message });
    }

    if (success) {
      toast.success(success, { description: message });
      router.push(ROUTES.DASHBOARD);
    }
  }

  return { form, onSubmit };
}
