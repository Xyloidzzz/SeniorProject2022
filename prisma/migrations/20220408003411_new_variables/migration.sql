/*
  Warnings:

  - You are about to drop the column `attendance` on the `Class` table. All the data in the column will be lost.
  - The `attachments` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `attachments` column on the `StudentHasAssignment` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Class" DROP COLUMN "attendance";

-- AlterTable
ALTER TABLE "ClassHasAssignment" ADD COLUMN     "type" TEXT,
ADD COLUMN     "weight" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "attachments",
ADD COLUMN     "attachments" TEXT[];

-- AlterTable
ALTER TABLE "StudentHasAssignment" ADD COLUMN     "isGraded" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "attachments",
ADD COLUMN     "attachments" TEXT[];

-- AlterTable
ALTER TABLE "StudentTakesClass" ADD COLUMN     "attendance" JSONB;
