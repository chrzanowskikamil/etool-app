import { REGISTER_DEFAULT_VALUES, REGISTER_FORM_SCHEMA } from '../schemas/register-form-schema';
import { signUpUser } from '../actions/sign-up-user';
import { toast } from 'sonner';
import { urlPaths } from '@/utils/paths';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UseFormReturn, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export function useRegisterForm(): { form: UseFormReturn<z.infer<typeof REGISTER_FORM_SCHEMA>>; onSubmit: (values: z.infer<typeof REGISTER_FORM_SCHEMA>) => Promise<void> } {
  const router = useRouter();
  const DELAY_ERROR = 300;

  const form = useForm<z.infer<typeof REGISTER_FORM_SCHEMA>>({
    delayError: DELAY_ERROR,
    defaultValues: REGISTER_DEFAULT_VALUES,
    mode: 'onTouched',
    resolver: zodResolver(REGISTER_FORM_SCHEMA),
  });

  const { setError } = form;

  async function onSubmit(values: z.infer<typeof REGISTER_FORM_SCHEMA>) {
    const { data } = await signUpUser(values);

    if (data?.error) {
      setError('username', { message: data.error });
      toast.error(data.error);
    }

    if (data?.success) {
      toast.success(data.success);
      router.replace(urlPaths.emailVerification);
    }
  }
  return { form, onSubmit };
}
