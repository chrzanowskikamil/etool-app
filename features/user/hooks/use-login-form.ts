import { LOGIN_DEFAULT_VALUES, LOGIN_FORM_SCHEMA } from '@/features/user/schemas/login-form-schema';
import { toast } from 'sonner';
import { signInUser, signInUser_SAFE_ACTION_FEATURE } from '@/features/user/actions/sign-in-user';
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
    // const { success, error, message, isPasswordValid, isUserExist } = await signInUser(values);
    const { data, serverError, validationErrors } = await signInUser_SAFE_ACTION_FEATURE(values);

    console.log(data, serverError, validationErrors);

    //     if (data?.isPasswordValid === false) {
    //       setError('password', {
    //         data.message,
    //       });
    //       toast.error(error, { description: message });
    //     }
    //
    //     if (data?.isUserExist === false) {
    //       setError('username', {
    //         data.message,
    //       });
    //       toast.error(error, { description: message });
    //     }
    //
    //     if (data?.success) {
    //       toast.success(data.success, { description: data.message });
    //     }
  }
  return { form, onSubmit };
}
