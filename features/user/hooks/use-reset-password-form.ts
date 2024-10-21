import { RESET_PASSWORD_DEFAULT_VALUES, RESET_PASSWORD_FORM_SCHEMA } from '../schemas/reset-password-form-schema';
import { sendPasswordResetLink } from '@/features/email/actions/send-password-reset-link';
import { toast } from 'sonner';
import { UseFormReturn, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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
    const { data } = await sendPasswordResetLink({ username });

    if (data?.error) {
      setError('username', { message: data.message });
      toast.error(data.error, { description: data.message });
    }

    if (data?.success) {
      toast.success(data.success, { description: data.message });
    }
  }
  return { form, onSubmit };
}
