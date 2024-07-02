'use server';
import { generateVerificationEmailCode } from '@/features/user/actions/tokens';
import { getUserByUsername } from '@/db/queries/user';
import { sendEmail } from './send-email';

export const sendVerificationEmailCode = async (username: string) => {
  try {
    const user = await getUserByUsername(username);
    if (!user) return { error: 'Verification - failed', message: 'User not found' };

    const code = await generateVerificationEmailCode(user.id, user.username);
    await sendEmail({ to: user.username, subject: 'Verify your email', text: `Your verification code is: ${code}` });
  } catch (error) {
    console.log(error);
  }
};
