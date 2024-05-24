import { LOGIN_DEFAULT_VALUES, LOGIN_FORM_SCHEMA } from '@/features/user/schemas/login-form-schema';
import { signInUser } from '@/features/user/actions/sign-in-user';
import { toast } from 'sonner';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn } from 'react-hook-form';

export function useLoginForm(): { form: UseFormReturn<z.infer<typeof LOGIN_FORM_SCHEMA>>; onSubmit: (values: z.infer<typeof LOGIN_FORM_SCHEMA>) => Promise<void> } {
  const DELAY_ERROR = 300;

  const form = useForm<z.infer<typeof LOGIN_FORM_SCHEMA>>({
    delayError: DELAY_ERROR,
    defaultValues: LOGIN_DEFAULT_VALUES,
    mode: 'onTouched',
    resolver: zodResolver(LOGIN_FORM_SCHEMA),
  });
  const { setError } = form;

  async function onSubmit(values: z.infer<typeof LOGIN_FORM_SCHEMA>) {
    const { data } = await signInUser(values);

    if (data?.error) {
      setError('username', { message: data.error });
      setError('password', { message: data.error });
      toast.error(data.error);
    }

    if (data?.success) {
      toast.success(data.success);
    }
  }
  return { form, onSubmit };
}
