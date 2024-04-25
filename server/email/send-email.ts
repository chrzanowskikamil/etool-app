import { Resend } from 'resend';

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = 'reset-password@etool.solutions';

export async function sendEmail(options: EmailOptions) {
  const { to, subject, text } = options;

  const { data, error } = await resend.emails.send({
    from: ADMIN_EMAIL,
    to,
    subject,
    text,
  });

  console.log(data, error);
}
