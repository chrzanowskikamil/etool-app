'use server';

import prisma from '@/lib/prisma';
import { User } from '@prisma/client';

interface ValidateUserResponse {
  success: boolean;
  error?: string;
  message?: string;
  isUserExist?: boolean;
  user?: User;
}

export const validateUser = async (username: string): Promise<ValidateUserResponse> => {
  try {
    const user = await prisma.user.findUnique({ where: { username } });

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
