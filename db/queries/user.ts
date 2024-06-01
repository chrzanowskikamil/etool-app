import { database } from '../prisma';
import { User } from 'lucia';

export const createUserByCredentials = async (credentials: User) => {
  return await database.user.create({
    data: credentials,
  });
};

export const getUserByUsername = async (username: string) => {
  return await database.user.findUnique({
    where: {
      username: username,
    },
  });
};

export const updateUserPassword = async (userId: string, newHashedPassword: string) => {
  await database.user.update({
    where: {
      id: userId,
    },
    data: {
      hashed_password: newHashedPassword,
    },
  });
};

export const createResetPasswordToken = async (userId: string, tokenId: string, expiresAt: Date) => {
  await database.resetPasswordToken.create({
    data: {
      id: tokenId,
      token: tokenId,
      userId: userId,
      expiresAt: expiresAt,
    },
  });
};

export const getResetPasswordToken = async (verificationToken: string) => {
  return await database.resetPasswordToken.findUnique({
    where: {
      id: verificationToken,
    },
  });
};

export const deleteResetPasswordTokenById = async (verificationToken: string) => {
  return await database.resetPasswordToken.delete({
    where: {
      id: verificationToken,
    },
  });
};

export const deleteResetPasswordTokenByUserId = async (userId: string) => {
  await database.resetPasswordToken.deleteMany({
    where: {
      userId: userId,
    },
  });
};