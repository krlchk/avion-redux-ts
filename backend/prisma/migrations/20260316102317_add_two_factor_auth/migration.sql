-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isTwoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "loginOtpExpiresAt" TIMESTAMP(3),
ADD COLUMN     "loginOtpHash" TEXT;
