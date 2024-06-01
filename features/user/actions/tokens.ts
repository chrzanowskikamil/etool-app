'use server';
import { createResetPasswordToken, deleteResetPasswordTokenByUserId } from "@/db/queries/user";
import { generateId } from "lucia";
import { TimeSpan, createDate } from "oslo";
import { TOKEN_ID_LENGTH } from "./utils";

export const generateResetPasswordToken = async (userId: string) => {
    const TOKEN_EXPIRATION_TIME = new TimeSpan(2, 'h');
    const tokenId = generateId(TOKEN_ID_LENGTH);

    await deleteResetPasswordTokenByUserId(userId);
    await createResetPasswordToken(userId, tokenId, createDate(TOKEN_EXPIRATION_TIME));

    return tokenId;
}