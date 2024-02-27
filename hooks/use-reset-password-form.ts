import { z } from 'zod';
import { RESET_PASSWORD_DEFAULT_VALUES, RESET_PASSWORD_FROM_SCHEMA } from '@/schemas/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

export function useResetPasswordForm() {
  const DELAY_ERROR = 300;

  const form = useForm<z.infer<typeof RESET_PASSWORD_FROM_SCHEMA>>({
    resolver: zodResolver(RESET_PASSWORD_FROM_SCHEMA),
    defaultValues: RESET_PASSWORD_DEFAULT_VALUES,
    mode: 'onTouched',
    delayError: DELAY_ERROR,
  });

  async function onSubmit(value: z.infer<typeof RESET_PASSWORD_FROM_SCHEMA>) {
    toast.success(value.username);
  }

  return { form, onSubmit };
}
