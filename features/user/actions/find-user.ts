'use server'

import { database } from "@/db";
import { User } from "lucia";

interface FindUserResponse {
    success: boolean;
    error?: string;
    message?: string;
    isUserExist?: boolean;
    user?: User;
  }
  
  export const findUser = async (username: string): Promise<FindUserResponse> => {
    try {
      const user = await database.user.findUnique({ where: { username } });
  
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