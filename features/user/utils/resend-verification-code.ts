import { sendVerificationEmailCode } from '@/features/email/actions/send-verification-email-code';
import { toast } from 'sonner';
import { User } from 'lucia';

export const resendVerificationCode = async (user: User) => {
  if (user && !user.emailVerified) {
    await sendVerificationEmailCode(user.username);
    toast.success('Verification code sent', { description: 'We sent you a new verification code to your email.' });
  }
};
