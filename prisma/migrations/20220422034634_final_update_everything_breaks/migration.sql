/*
  Warnings:

  - The values [USER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `gradeWeight` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `isOnline` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `schedule` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `term` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `attachments` on the `StudentHasAssignment` table. All the data in the column will be lost.
  - You are about to drop the `Assistant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AssistantTeachesClass` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ClassHasAssignment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ClassHasPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InstructorTeachesClass` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentTakesClass` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `classNum` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creditHours` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Class` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ADMIN', 'STUDENT', 'INSTRUCTOR');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Assistant" DROP CONSTRAINT "Assistant_userID_fkey";

-- DropForeignKey
ALTER TABLE "AssistantTeachesClass" DROP CONSTRAINT "AssistantTeachesClass_assistantID_fkey";

-- DropForeignKey
ALTER TABLE "AssistantTeachesClass" DROP CONSTRAINT "AssistantTeachesClass_classID_fkey";

-- DropForeignKey
ALTER TABLE "ClassHasAssignment" DROP CONSTRAINT "ClassHasAssignment_assignmentID_fkey";

-- DropForeignKey
ALTER TABLE "ClassHasAssignment" DROP CONSTRAINT "ClassHasAssignment_classID_fkey";

-- DropForeignKey
ALTER TABLE "ClassHasPost" DROP CONSTRAINT "ClassHasPost_classID_fkey";

-- DropForeignKey
ALTER TABLE "ClassHasPost" DROP CONSTRAINT "ClassHasPost_postID_fkey";

-- DropForeignKey
ALTER TABLE "InstructorTeachesClass" DROP CONSTRAINT "InstructorTeachesClass_classID_fkey";

-- DropForeignKey
ALTER TABLE "InstructorTeachesClass" DROP CONSTRAINT "InstructorTeachesClass_instructorID_fkey";

-- DropForeignKey
ALTER TABLE "StudentTakesClass" DROP CONSTRAINT "StudentTakesClass_classID_fkey";

-- DropForeignKey
ALTER TABLE "StudentTakesClass" DROP CONSTRAINT "StudentTakesClass_studentID_fkey";

-- AlterTable
ALTER TABLE "Class" DROP COLUMN "gradeWeight",
DROP COLUMN "isOnline",
DROP COLUMN "name",
DROP COLUMN "schedule",
DROP COLUMN "term",
ADD COLUMN     "classNum" TEXT NOT NULL,
ADD COLUMN     "creditHours" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "registerDate" DROP DEFAULT,
ALTER COLUMN "registerDate" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "StudentHasAssignment" DROP COLUMN "attachments",
ADD COLUMN     "submitAttachments" TEXT[];

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT,
ALTER COLUMN "prefix" DROP NOT NULL;

-- DropTable
DROP TABLE "Assistant";

-- DropTable
DROP TABLE "AssistantTeachesClass";

-- DropTable
DROP TABLE "ClassHasAssignment";

-- DropTable
DROP TABLE "ClassHasPost";

-- DropTable
DROP TABLE "InstructorTeachesClass";

-- DropTable
DROP TABLE "StudentTakesClass";

-- CreateTable
CREATE TABLE "Section" (
    "id" TEXT NOT NULL,
    "sectionNum" TEXT NOT NULL,
    "term" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "schedule" TEXT NOT NULL,
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "isSynchronous" BOOLEAN NOT NULL DEFAULT true,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "gradeWeight" JSONB[],
    "classID" TEXT NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentTakesSection" (
    "id" TEXT NOT NULL,
    "finalGrade" TEXT,
    "attendance" JSONB[],
    "studentID" TEXT,
    "sectionID" TEXT,

    CONSTRAINT "StudentTakesSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentAssistsSection" (
    "id" TEXT NOT NULL,
    "classPermissions" TEXT,
    "studentID" TEXT,
    "sectionID" TEXT,

    CONSTRAINT "StudentAssistsSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InstructorTeachesSection" (
    "id" TEXT NOT NULL,
    "instructorID" TEXT,
    "sectionID" TEXT,

    CONSTRAINT "InstructorTeachesSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SectionHasAssignment" (
    "id" TEXT NOT NULL,
    "type" TEXT,
    "weight" DOUBLE PRECISION,
    "isHidden" BOOLEAN NOT NULL DEFAULT false,
    "sectionID" TEXT,
    "assignmentID" TEXT,

    CONSTRAINT "SectionHasAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SectionHasPost" (
    "id" TEXT NOT NULL,
    "isHidden" BOOLEAN NOT NULL DEFAULT false,
    "sectionID" TEXT,
    "postID" TEXT,

    CONSTRAINT "SectionHasPost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Section_classID_key" ON "Section"("classID");

-- CreateIndex
CREATE UNIQUE INDEX "InstructorTeachesSection_sectionID_key" ON "InstructorTeachesSection"("sectionID");

-- CreateIndex
CREATE UNIQUE INDEX "SectionHasAssignment_assignmentID_key" ON "SectionHasAssignment"("assignmentID");

-- CreateIndex
CREATE UNIQUE INDEX "SectionHasPost_postID_key" ON "SectionHasPost"("postID");

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_classID_fkey" FOREIGN KEY ("classID") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentTakesSection" ADD CONSTRAINT "StudentTakesSection_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentTakesSection" ADD CONSTRAINT "StudentTakesSection_sectionID_fkey" FOREIGN KEY ("sectionID") REFERENCES "Section"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentAssistsSection" ADD CONSTRAINT "StudentAssistsSection_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentAssistsSection" ADD CONSTRAINT "StudentAssistsSection_sectionID_fkey" FOREIGN KEY ("sectionID") REFERENCES "Section"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstructorTeachesSection" ADD CONSTRAINT "InstructorTeachesSection_instructorID_fkey" FOREIGN KEY ("instructorID") REFERENCES "Instructor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstructorTeachesSection" ADD CONSTRAINT "InstructorTeachesSection_sectionID_fkey" FOREIGN KEY ("sectionID") REFERENCES "Section"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionHasAssignment" ADD CONSTRAINT "SectionHasAssignment_sectionID_fkey" FOREIGN KEY ("sectionID") REFERENCES "Section"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionHasAssignment" ADD CONSTRAINT "SectionHasAssignment_assignmentID_fkey" FOREIGN KEY ("assignmentID") REFERENCES "Assignment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionHasPost" ADD CONSTRAINT "SectionHasPost_sectionID_fkey" FOREIGN KEY ("sectionID") REFERENCES "Section"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionHasPost" ADD CONSTRAINT "SectionHasPost_postID_fkey" FOREIGN KEY ("postID") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
