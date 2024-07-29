import { database } from '../prisma';
import { isWithinExpirationDate } from 'oslo';
import { User } from 'lucia';

export const createUserByCredentials = async (credentials: Omit<User, 'githubId' | 'linkedInId'>) => {
  return await database.user.create({
    data: credentials,
  });
};

export const createUserByGitHubId = async (id: string, githubId: number, username: string, hashedPassword: string, firstName: string, emailVerified: boolean) => {
  return await database.user.create({
    data: {
      id: id,
      githubId: githubId,
      username: username,
      hashed_password: hashedPassword,
      firstName: firstName,
      emailVerified: emailVerified,
    },
  });
};

export const createUserByLinkedInId = async (id: string, linkedInId: string, username: string, hashedPassword: string, firstName: string, lastName: string, emailVerified: boolean) => {
  return await database.user.create({
    data: {
      id: id,
      linkedInId: linkedInId,
      username: username,
      hashed_password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
      emailVerified: emailVerified,
    },
  });
};

export const getUserByUsername = async (username: string) => {
  return await database.user.findUnique({
    where: {
      username: username,
    },
  });
};

export const updateUserGithubIdByEmail = async (githubEmail: string, githubId: number, emailVerified: boolean) => {
  await database.user.update({
    where: {
      username: githubEmail,
    },
    data: {
      githubId: githubId,
      emailVerified: emailVerified,
    },
  });
};

export const updateUserLinkedinIdByEmail = async (linkedInEmail: string, linkedInId: string, emailVerified: boolean) => {
  await database.user.update({
    where: {
      username: linkedInEmail,
    },
    data: {
      linkedInId: linkedInId,
      emailVerified: emailVerified,
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

export const updateEmailVerifiedStatus = async (userId: string, emailVerified: boolean) => {
  await database.user.update({
    where: {
      id: userId,
    },
    data: {
      emailVerified: emailVerified,
    },
  });
};

export const createVerificationEmailToken = async (userId: string, email: string, code: string, expiresAt: Date) => {
  await database.emailVerificationToken.create({
    data: {
      id: userId,
      userId: userId,
      email: email,
      code: code,
      expiresAt: expiresAt,
    },
  });
};

export const deleteVerificationEmailCodeByUserId = async (userId: string) => {
  await database.emailVerificationToken.deleteMany({
    where: {
      userId: userId,
    },
  });
};

export const verifyVerificationEmailCode = async (user: User, code: string): Promise<boolean> => {
  return await database.$transaction(async (prisma) => {
    const databaseVerificationCode = await prisma.emailVerificationToken.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!databaseVerificationCode || databaseVerificationCode.code !== code) return false;

    if (!isWithinExpirationDate(databaseVerificationCode.expiresAt)) return false;

    await prisma.emailVerificationToken.deleteMany({
      where: {
        code: code,
      },
    });

    const databaseUser = await getUserByUsername(user.username);
    if (databaseUser?.username !== user.username) return false;

    return true;
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
