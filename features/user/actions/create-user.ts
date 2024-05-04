'use server'

import { Argon2id } from "oslo/password";
import { database } from "@/db";
import { REGISTER_FORM_SCHEMA } from "../schemas/register-form-schema";
import { User, generateId } from "lucia";
import { z } from "zod";

export const createUser = async (credentials: z.infer<typeof REGISTER_FORM_SCHEMA>): Promise<User> => {
    const userId = generateId(15);
    const { firstName, lastName, username, password } = credentials;
    const hashedPassword = await new Argon2id().hash(password);
  
    const userData: User = {
      id: userId,
      firstName,
      lastName,
      username,
      hashed_password: hashedPassword,
    };
  
    try {
      return await database.user.create({ data: userData });
    } catch (error) {
      throw new Error(`Error in createUser function: ${error}`);
    }
  };