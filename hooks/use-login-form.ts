import z from 'zod';
import { LOGIN_DEFAULT_VALUES, LOGIN_FORM_SCHEMA } from '@/schemas/form-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { signInUser } from '@/lib/user';

export function useLoginForm() {
  const DELAY_ERROR = 300;

  const form = useForm<z.infer<typeof LOGIN_FORM_SCHEMA>>({
    resolver: zodResolver(LOGIN_FORM_SCHEMA),
    defaultValues: LOGIN_DEFAULT_VALUES,
    mode: 'onTouched',
    delayError: DELAY_ERROR,
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
