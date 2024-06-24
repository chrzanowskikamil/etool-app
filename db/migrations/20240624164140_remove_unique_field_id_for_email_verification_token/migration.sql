/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `EmailVerificationToken` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "EmailVerificationToken_code_key";

-- CreateIndex
CREATE UNIQUE INDEX "EmailVerificationToken_userId_key" ON "EmailVerificationToken"("userId");
