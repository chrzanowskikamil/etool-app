import { EMAIL_VERIFICATION_DEFAULT_VALUES, EMAIL_VERIFICATION_FORM_SCHEMA } from '../schemas/email-verification-schema';
import { useRouter } from 'next/navigation';
import { UseFormReturn, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { checkEmailVerificationCode } from '../actions/tokens';

export function useEmailVerificationForm(): { form: UseFormReturn<z.infer<typeof EMAIL_VERIFICATION_FORM_SCHEMA>>; onSubmit: (values: z.infer<typeof EMAIL_VERIFICATION_FORM_SCHEMA>) => Promise<void> } {
  const DELAY_ERROR = 300;
  const router = useRouter();

  const form = useForm<z.infer<typeof EMAIL_VERIFICATION_FORM_SCHEMA>>({
    delayError: DELAY_ERROR,
    defaultValues: EMAIL_VERIFICATION_DEFAULT_VALUES,
    mode: 'onTouched',
    resolver: zodResolver(EMAIL_VERIFICATION_FORM_SCHEMA),
  });

  async function onSubmit(values: z.infer<typeof EMAIL_VERIFICATION_FORM_SCHEMA>) {
    const validCode = await checkEmailVerificationCode(values.code);
    toast.success(validCode);
  }

  return { form, onSubmit };
}
