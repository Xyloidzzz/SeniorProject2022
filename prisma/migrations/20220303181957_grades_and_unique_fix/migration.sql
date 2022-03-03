/*
  Warnings:

  - You are about to drop the column `gradesId` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the `Grades` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_gradesId_fkey";

-- DropIndex
DROP INDEX "Assignment_classId_key";

-- DropIndex
DROP INDEX "Class_gradesId_key";

-- DropIndex
DROP INDEX "Class_ownerId_key";

-- DropIndex
DROP INDEX "Educator_classId_key";

-- DropIndex
DROP INDEX "Educator_userId_key";

-- DropIndex
DROP INDEX "Student_classId_key";

-- DropIndex
DROP INDEX "Student_userId_key";

-- AlterTable
ALTER TABLE "Class" DROP COLUMN "gradesId",
ADD COLUMN     "grades" INTEGER[];

-- DropTable
DROP TABLE "Grades";
