import { checkEmailVerificationCode } from '../actions/tokens';
import { EMAIL_VERIFICATION_DEFAULT_VALUES, EMAIL_VERIFICATION_FORM_SCHEMA } from '../schemas/email-verification-schema';
import { toast } from 'sonner';
import { urlPaths } from '@/utils/paths';
import { useRouter } from 'next/navigation';
import { UseFormReturn, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export function useEmailVerificationForm(): { form: UseFormReturn<z.infer<typeof EMAIL_VERIFICATION_FORM_SCHEMA>>; onSubmit: (values: z.infer<typeof EMAIL_VERIFICATION_FORM_SCHEMA>) => Promise<void> } {
  const DELAY_ERROR = 300;
  const router = useRouter();

  const form = useForm<z.infer<typeof EMAIL_VERIFICATION_FORM_SCHEMA>>({
    delayError: DELAY_ERROR,
    defaultValues: EMAIL_VERIFICATION_DEFAULT_VALUES,
    mode: 'onTouched',
    resolver: zodResolver(EMAIL_VERIFICATION_FORM_SCHEMA),
  });

  const { setError } = form;

  async function onSubmit(values: z.infer<typeof EMAIL_VERIFICATION_FORM_SCHEMA>) {
    const result = await checkEmailVerificationCode(values.code);

    if (result.error) {
      setError('code', { message: result.message });
      toast.error(result.error, { description: result.message });
    }

    if (result.success) {
      toast.success(result.success, { description: result.message });
      router.push(urlPaths.dashboard);
    }
  }

  return { form, onSubmit };
}
