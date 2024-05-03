'use server';

import { Argon2id } from 'oslo/password';
import { auth } from '../../../lib/auth';
import { createSession, getSession } from '../../session/session';
import { cookies } from 'next/headers';
import { database } from '@/db';
import { LOGIN_FORM_SCHEMA } from '@/features/user/schemas/login-form-schema';
import { User, generateId } from 'lucia';
import { z } from 'zod';
import { TimeSpan, createDate } from 'oslo';
import { sendEmail } from '@/features/email/send-email';
import { createResetPasswordLink } from '@/utils/paths';
import { REGISTER_FORM_SCHEMA } from '../schemas/register-form-schema';
import { RESET_PASSWORD_FORM_SCHEMA } from '../schemas/reset-password-form-schema';

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

interface GetUserResponse {
  success: boolean;
  error?: string;
  message?: string;
  isUserExist?: boolean;
  user?: User;
}

export const getUser = async (username: string): Promise<GetUserResponse> => {
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

export const signInUser = async (credentials: z.infer<typeof LOGIN_FORM_SCHEMA>) => {
  const { username, password } = credentials;

  try {
    const { success, error, message, user, isUserExist } = await getUser(username);

    if (!user) return { success, error, message, isUserExist };

    const isPasswordValid = await new Argon2id().verify(user.hashed_password, password);

    if (!isPasswordValid) return { success: false, error: 'Bad credentials', message: 'Wrong password', isPasswordValid };

    await createSession(user.id);
    return { success: true, error: '', message };
  } catch (error) {
    console.error(`Error in signIn function: ${error}`);
    return {
      success: false,
      error: 'Internal server error',
      message: 'An error occurred while signing in',
    };
  }
};

export const signUpUser = async (credentials: z.infer<typeof REGISTER_FORM_SCHEMA>) => {
  const { username } = credentials;

  try {
    const { isUserExist } = await getUser(username);

    if (isUserExist) {
      return {
        error: 'Register Failed',
        message: 'This email is already registered',
      };
    }

    const user = await createUser(credentials);
    user && (await createSession(user.id));
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

export const createPasswordResetToken = async (userId: string) => {
  const EXPIRE_IN = new TimeSpan(2, 'h');
  await database.resetPasswordToken.deleteMany({
    where: {
      userId: userId,
    },
  });

  const tokenId = generateId(40);

  await database.resetPasswordToken.create({
    data: {
      id: tokenId,
      token: tokenId,
      userId: userId,
      expiresAt: createDate(EXPIRE_IN),
    },
  });

  return tokenId;
};

export const sendPasswordResetLink = async (username: string) => {
  const parsedData = RESET_PASSWORD_FORM_SCHEMA.parse({ username });

  try {
    const user = await database.user.findUnique({
      where: {
        username: parsedData.username,
      },
    });

    if (!user) {
      return {
        error: 'Reseting failed',
        message: `User with this email isn't exist.`,
      };
    }

    const resetPasswordToken = await createPasswordResetToken(user.id);
    sendEmail({ to: username, subject: 'Reset your password', text: `Click on this link to reset your password: ${createResetPasswordLink(resetPasswordToken)}` });

    return {
      success: 'Reseting - success',
      message: 'Take a look at your mailbox, we have sent you further instructions.',
    };
  } catch (error) {
    console.error(error);
    return {
      error: 'Oops, something went wrong on the server',
      message: 'Try later again',
    };
  }
};

export const createNewPassword = async (newPassword: string, verificationToken: string) => {
  try {
    const token = await database.resetPasswordToken.findUnique({
      where: {
        id: verificationToken,
      },
    });

    if (!token) {
      return { error: 'Setting a new password - failed', message: 'The token is invalid or expired' };
    }

    if (token) {
      await database.resetPasswordToken.delete({
        where: {
          id: verificationToken,
        },
      });
    }

    await auth.invalidateUserSessions(token.userId);
    const newHashedPassword = await new Argon2id().hash(newPassword);

    await database.user.update({
      where: {
        id: token.userId,
      },
      data: {
        hashed_password: newHashedPassword,
      },
    });

    const session = await auth.createSession(token.userId, {});
    const sessionCookie = auth.createSessionCookie(session.id);
    const sessionCookiePlainObject = JSON.parse(JSON.stringify(sessionCookie));
    return { success: 'Setting a new password - success', message: 'Your password has been changed - log in using your new credentials', sessionCookiePlainObject };
  } catch (error) {
    return { error: 'Setting a new password - failed', message: 'Oops, something went wrong on the server' };
  }
};
