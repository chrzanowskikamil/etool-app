'use client';

import { FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Form() {
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await signIn('credentials', {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      redirect: false,
    });

    console.log({ response });

    if (!response?.error) {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type='email'
          name='email'
        />
      </label>
      <label>
        Password:
        <input
          type='password'
          name='password'
        />
      </label>
      <input
        type='submit'
        value='Login'
      />
    </form>
  );
}
