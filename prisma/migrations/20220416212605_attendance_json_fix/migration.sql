/*
  Warnings:

  - The `attendance` column on the `StudentTakesClass` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "StudentTakesClass" DROP COLUMN "attendance",
ADD COLUMN     "attendance" JSONB[];
