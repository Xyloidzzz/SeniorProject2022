/*
  Warnings:

  - The primary key for the `Assignment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `author` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `body` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `classId` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `files` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `hidden` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `shortDescription` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `submitFiles` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Assignment` table. All the data in the column will be lost.
  - The primary key for the `Class` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Class` table. All the data in the column will be lost.
  - The primary key for the `Post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `classId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `hidden` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Post` table. All the data in the column will be lost.
  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `classId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `finalGrade` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the `Educator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Grade` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userID]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - The required column `assignmentID` was added to the `Assignment` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `classID` was added to the `Class` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `department` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `term` to the `Class` table without a default value. This is not possible if the table is not empty.
  - The required column `postID` was added to the `Post` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `studentID` was added to the `Student` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `userID` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prefix` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_classId_fkey";

-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Educator" DROP CONSTRAINT "Educator_classId_fkey";

-- DropForeignKey
ALTER TABLE "Educator" DROP CONSTRAINT "Educator_userId_fkey";

-- DropForeignKey
ALTER TABLE "Grade" DROP CONSTRAINT "Grade_assignmentId_fkey";

-- DropForeignKey
ALTER TABLE "Grade" DROP CONSTRAINT "Grade_classId_fkey";

-- DropForeignKey
ALTER TABLE "Grade" DROP CONSTRAINT "Grade_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_classId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_classId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_userId_fkey";

-- AlterTable
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_pkey",
DROP COLUMN "author",
DROP COLUMN "body",
DROP COLUMN "classId",
DROP COLUMN "files",
DROP COLUMN "hidden",
DROP COLUMN "id",
DROP COLUMN "shortDescription",
DROP COLUMN "submitFiles",
DROP COLUMN "type",
ADD COLUMN     "assignmentID" TEXT NOT NULL,
ADD COLUMN     "attachments" TEXT,
ADD COLUMN     "description" TEXT,
ADD CONSTRAINT "Assignment_pkey" PRIMARY KEY ("assignmentID");

-- AlterTable
ALTER TABLE "Class" DROP CONSTRAINT "Class_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "ownerId",
DROP COLUMN "updatedAt",
ADD COLUMN     "attendance" JSONB,
ADD COLUMN     "classID" TEXT NOT NULL,
ADD COLUMN     "department" TEXT NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "isOnline" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "schedule" TEXT,
ADD COLUMN     "term" TEXT NOT NULL,
ALTER COLUMN "name" SET DATA TYPE TEXT,
ADD CONSTRAINT "Class_pkey" PRIMARY KEY ("classID");

-- AlterTable
ALTER TABLE "Post" DROP CONSTRAINT "Post_pkey",
DROP COLUMN "classId",
DROP COLUMN "hidden",
DROP COLUMN "id",
ADD COLUMN     "attachments" TEXT,
ADD COLUMN     "postID" TEXT NOT NULL,
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "title" DROP DEFAULT,
ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("postID");

-- AlterTable
ALTER TABLE "Student" DROP CONSTRAINT "Student_pkey",
DROP COLUMN "classId",
DROP COLUMN "finalGrade",
DROP COLUMN "id",
DROP COLUMN "userId",
ADD COLUMN     "registerDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "studentID" TEXT NOT NULL,
ADD COLUMN     "userID" TEXT NOT NULL,
ADD CONSTRAINT "Student_pkey" PRIMARY KEY ("studentID");

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "prefix" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Educator";

-- DropTable
DROP TABLE "Grade";

-- DropEnum
DROP TYPE "AssignmentType";

-- CreateTable
CREATE TABLE "Instructor" (
    "instructorID" TEXT NOT NULL,
    "officeHours" TEXT NOT NULL,
    "userID" TEXT NOT NULL,

    CONSTRAINT "Instructor_pkey" PRIMARY KEY ("instructorID")
);

-- CreateTable
CREATE TABLE "Assistant" (
    "assistantID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,

    CONSTRAINT "Assistant_pkey" PRIMARY KEY ("assistantID")
);

-- CreateTable
CREATE TABLE "StudentTakesClass" (
    "id" TEXT NOT NULL,
    "finalGrade" TEXT,
    "studentID" TEXT,
    "classID" TEXT,

    CONSTRAINT "StudentTakesClass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InstructorTeachesClass" (
    "id" TEXT NOT NULL,
    "instructorID" TEXT,
    "classID" TEXT,

    CONSTRAINT "InstructorTeachesClass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssistantTeachesClass" (
    "id" TEXT NOT NULL,
    "classPermissions" TEXT NOT NULL,
    "assistantID" TEXT,
    "classID" TEXT,

    CONSTRAINT "AssistantTeachesClass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentHasAssignment" (
    "id" TEXT NOT NULL,
    "grade" TEXT,
    "comments" TEXT,
    "attachments" TEXT,
    "studentID" TEXT,
    "assignmentID" TEXT,

    CONSTRAINT "StudentHasAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassHasAssignment" (
    "id" TEXT NOT NULL,
    "isHidden" BOOLEAN NOT NULL DEFAULT true,
    "classID" TEXT,
    "assignmentID" TEXT,

    CONSTRAINT "ClassHasAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassHasPost" (
    "id" TEXT NOT NULL,
    "isHidden" BOOLEAN NOT NULL DEFAULT true,
    "classID" TEXT,
    "postID" TEXT,

    CONSTRAINT "ClassHasPost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Instructor_userID_key" ON "Instructor"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "Assistant_userID_key" ON "Assistant"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "InstructorTeachesClass_classID_key" ON "InstructorTeachesClass"("classID");

-- CreateIndex
CREATE UNIQUE INDEX "ClassHasAssignment_assignmentID_key" ON "ClassHasAssignment"("assignmentID");

-- CreateIndex
CREATE UNIQUE INDEX "ClassHasPost_postID_key" ON "ClassHasPost"("postID");

-- CreateIndex
CREATE UNIQUE INDEX "Student_userID_key" ON "Student"("userID");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instructor" ADD CONSTRAINT "Instructor_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assistant" ADD CONSTRAINT "Assistant_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentTakesClass" ADD CONSTRAINT "StudentTakesClass_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("studentID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentTakesClass" ADD CONSTRAINT "StudentTakesClass_classID_fkey" FOREIGN KEY ("classID") REFERENCES "Class"("classID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstructorTeachesClass" ADD CONSTRAINT "InstructorTeachesClass_instructorID_fkey" FOREIGN KEY ("instructorID") REFERENCES "Instructor"("instructorID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstructorTeachesClass" ADD CONSTRAINT "InstructorTeachesClass_classID_fkey" FOREIGN KEY ("classID") REFERENCES "Class"("classID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssistantTeachesClass" ADD CONSTRAINT "AssistantTeachesClass_assistantID_fkey" FOREIGN KEY ("assistantID") REFERENCES "Assistant"("assistantID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssistantTeachesClass" ADD CONSTRAINT "AssistantTeachesClass_classID_fkey" FOREIGN KEY ("classID") REFERENCES "Class"("classID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentHasAssignment" ADD CONSTRAINT "StudentHasAssignment_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("studentID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentHasAssignment" ADD CONSTRAINT "StudentHasAssignment_assignmentID_fkey" FOREIGN KEY ("assignmentID") REFERENCES "Assignment"("assignmentID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassHasAssignment" ADD CONSTRAINT "ClassHasAssignment_classID_fkey" FOREIGN KEY ("classID") REFERENCES "Class"("classID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassHasAssignment" ADD CONSTRAINT "ClassHasAssignment_assignmentID_fkey" FOREIGN KEY ("assignmentID") REFERENCES "Assignment"("assignmentID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassHasPost" ADD CONSTRAINT "ClassHasPost_classID_fkey" FOREIGN KEY ("classID") REFERENCES "Class"("classID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassHasPost" ADD CONSTRAINT "ClassHasPost_postID_fkey" FOREIGN KEY ("postID") REFERENCES "Post"("postID") ON DELETE SET NULL ON UPDATE CASCADE;
