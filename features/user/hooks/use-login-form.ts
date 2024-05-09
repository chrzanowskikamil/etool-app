import { LOGIN_DEFAULT_VALUES, LOGIN_FORM_SCHEMA } from '@/features/user/schemas/login-form-schema';
import { toast } from 'sonner';
import { signInUser } from '@/features/user/actions/sign-in-user';
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
    const { success, error, message, isPasswordValid, isUserExist } = await signInUser(values);

    if (isPasswordValid === false) {
      setError('password', {
        message,
      });
      toast.error(error, { description: message });
    }

    if (isUserExist === false) {
      setError('username', {
        message,
      });
      toast.error(error, { description: message });
    }

    if (success) {
      toast.success(success, { description: message });
    }
  }
  return { form, onSubmit };
}
