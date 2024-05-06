'use server'

import { createUser } from "./create-user";
import { createSession } from "@/lib/auth/create-session";
import { findUser } from "./find-user";
import { REGISTER_FORM_SCHEMA } from "../schemas/register-form-schema";
import { z } from "zod";

export const signUpUser = async (credentials: z.infer<typeof REGISTER_FORM_SCHEMA>) => {
    const { username } = credentials;
  
    try {
      const { isUserExist } = await findUser(username);
  
      if (isUserExist) {
        return {
          error: 'Register Failed',
          message: 'This email is already registered',
        };
      }
  
      const user = await createUser(credentials);
      user && await createSession(user.id);
      return {
        success: 'Register Success',
        message: 'You have successfully registered',
      };
    } catch (error) {
      return {
        error: 'Register Failed',
        message: 'Something went wrong',
      };
    }
  };
  