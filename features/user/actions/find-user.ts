'use server';

import { getUserByUsername } from '@/db/queries/user';
import { User } from 'lucia';

interface FindUserResponse {
  success: boolean;
  error?: string;
  message?: string;
  isUserExist?: boolean;
  user?: User;
}

export const findUser = async (username: string): Promise<FindUserResponse> => {
  try {
    const user = await getUserByUsername(username);

    if (!user) {
      return {
        success: false,
        error: 'User not found',
        message: 'This email address is not registered',
        isUserExist: false,
      };
    }

    return {
      success: true,
      message: 'Login successful',
      isUserExist: true,
      user,
    };
  } catch (error) {
    console.error(`Error in validateUser function: ${error}`);
    throw error;
  }
};
