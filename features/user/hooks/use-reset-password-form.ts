import { RESET_PASSWORD_DEFAULT_VALUES, RESET_PASSWORD_FORM_SCHEMA } from '../schemas/reset-password-form-schema';
import { sendPasswordResetLink } from '../actions/create-new-password';
import { toast } from 'sonner';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UseFormReturn, useForm } from 'react-hook-form';

export function useResetPasswordForm(): { form: UseFormReturn<z.infer<typeof RESET_PASSWORD_FORM_SCHEMA>>; onSubmit: (value: z.infer<typeof RESET_PASSWORD_FORM_SCHEMA>) => Promise<void> } {
  const DELAY_ERROR = 300;

  const form = useForm<z.infer<typeof RESET_PASSWORD_FORM_SCHEMA>>({
    delayError: DELAY_ERROR,
    defaultValues: RESET_PASSWORD_DEFAULT_VALUES,
    mode: 'onTouched',
    resolver: zodResolver(RESET_PASSWORD_FORM_SCHEMA),
  });

  const { setError } = form;

  async function onSubmit(value: z.infer<typeof RESET_PASSWORD_FORM_SCHEMA>) {
    const { username } = value;
    const { success, error, message } = await sendPasswordResetLink(username);

    if (error) {
      setError('username', { message });
      toast.error(error, { description: message });
    }

    if (success) {
      toast.success(success, { description: message });
    }
  }
  return { form, onSubmit };
}
