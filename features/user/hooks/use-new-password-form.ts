import { createNewPassword } from '@/features/user/actions/user';
import { urlPaths } from '@/utils/paths';
import { toast } from 'sonner';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { NEW_PASSWORD_DEFAULT_VALUES, NEW_PASSWORD_FORM_SCHEMA } from '../schemas/new-password-form-schema';

export function useNewPasswordForm() {
  const DELAY_ERROR = 300;
  const router = useRouter();

  const form = useForm<z.infer<typeof NEW_PASSWORD_FORM_SCHEMA>>({
    resolver: zodResolver(NEW_PASSWORD_FORM_SCHEMA),
    defaultValues: NEW_PASSWORD_DEFAULT_VALUES,
    mode: 'onTouched',
    delayError: DELAY_ERROR,
  });

  async function onSubmit(value: z.infer<typeof NEW_PASSWORD_FORM_SCHEMA>) {
    const { password } = value;
    const verificationToken = new URLSearchParams(window.location.search).get('token');

    if (verificationToken) {
      const { error, success, message } = await createNewPassword(password, verificationToken);

      if (error) {
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