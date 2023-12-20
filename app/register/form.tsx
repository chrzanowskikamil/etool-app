'use client';

import { FormEvent } from 'react';

export default function Form() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch('api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password'),
      }),
    });
    console.log({ response });
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
        value='Register'
      />
    </form>
  );
}
