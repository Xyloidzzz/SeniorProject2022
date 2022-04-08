/*
  Warnings:

  - The `gradeWeight` column on the `Class` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Class" DROP COLUMN "gradeWeight",
ADD COLUMN     "gradeWeight" JSONB[];
