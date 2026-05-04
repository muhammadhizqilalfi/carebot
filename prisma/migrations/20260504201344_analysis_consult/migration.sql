/*
  Warnings:

  - Added the required column `updatedAt` to the `ChatArchive` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChatArchive" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
