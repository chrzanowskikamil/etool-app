import type { User } from 'lucia';

interface RegisterUserResponse {
  message: string;
  status: number;
}

export const registerUser = async (values: Partial<User>) => {
  // TODO: consider to create fetcher function
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });

  const data: RegisterUserResponse = await response.json();
  return data;
};
