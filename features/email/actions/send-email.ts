'use server';
import { Resend } from 'resend';

const ADMIN_EMAIL = 'reset-password@etool.solutions';
const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
}

export async function sendEmail(options: EmailOptions) {
  const { to, subject, text } = options;

  console.log('Sending email...' + to);
  console.log('Text: ' + text);
  const { data, error } = await resend.emails.send({
    from: ADMIN_EMAIL,
    to,
    subject,
    text,
  });

  console.log(data, error);
}
