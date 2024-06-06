import { createNewPassword } from '../actions/create-new-password';
import { NEW_PASSWORD_DEFAULT_VALUES, NEW_PASSWORD_FORM_SCHEMA } from '../schemas/new-password-form-schema';
import { toast } from 'sonner';
import { urlPaths } from '@/utils/paths';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UseFormReturn, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export function useNewPasswordForm(): { form: UseFormReturn<z.infer<typeof NEW_PASSWORD_FORM_SCHEMA>>; onSubmit: (value: z.infer<typeof NEW_PASSWORD_FORM_SCHEMA>) => Promise<void> } {
  const DELAY_ERROR = 300;
  const router = useRouter();

  const form = useForm<z.infer<typeof NEW_PASSWORD_FORM_SCHEMA>>({
    delayError: DELAY_ERROR,
    defaultValues: NEW_PASSWORD_DEFAULT_VALUES,
    mode: 'onTouched',
    resolver: zodResolver(NEW_PASSWORD_FORM_SCHEMA),
  });

  const { setError } = form;

  async function onSubmit(value: z.infer<typeof NEW_PASSWORD_FORM_SCHEMA>) {
    const { password } = value;
    const verificationToken = new URLSearchParams(window.location.search).get('token');

    if (verificationToken) {
      const { error, success, message } = await createNewPassword(password, verificationToken);

      if (error) {
        setError('password', { message });
        toast.error(error, { description: message });
      }

      if (success) {
        toast.success(success, { description: message });
        router.push(urlPaths.login);
      }
    }
  }

  return { form, onSubmit };
}
