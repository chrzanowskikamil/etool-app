'use server'

import { auth } from "@/lib/auth";
import { getSession } from "@/lib/auth/get-session";
import { cookies } from "next/headers";

export const signOutUser = async () => {
    const { session } = await getSession();
    await auth.invalidateSession(session?.id as string);
  
    const sessionCookie = auth.createBlankSessionCookie();
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  
    return {
      status: 'success',
      message: 'You have been successfully logged out',
    };
  };