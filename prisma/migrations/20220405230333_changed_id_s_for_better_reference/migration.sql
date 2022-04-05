/*
  Warnings:

  - The primary key for the `Assignment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `assignmentID` on the `Assignment` table. All the data in the column will be lost.
  - The primary key for the `Assistant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `assistantID` on the `Assistant` table. All the data in the column will be lost.
  - The primary key for the `Class` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `classID` on the `Class` table. All the data in the column will be lost.
  - The primary key for the `Instructor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `instructorID` on the `Instructor` table. All the data in the column will be lost.
  - The primary key for the `Post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `postID` on the `Post` table. All the data in the column will be lost.
  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `studentID` on the `Student` table. All the data in the column will be lost.
  - The required column `id` was added to the `Assignment` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Assistant` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Class` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Instructor` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Post` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Student` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
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
ALTER TABLE "StudentHasAssignment" DROP CONSTRAINT "StudentHasAssignment_assignmentID_fkey";

-- DropForeignKey
ALTER TABLE "StudentHasAssignment" DROP CONSTRAINT "StudentHasAssignment_studentID_fkey";

-- DropForeignKey
ALTER TABLE "StudentTakesClass" DROP CONSTRAINT "StudentTakesClass_classID_fkey";

-- DropForeignKey
ALTER TABLE "StudentTakesClass" DROP CONSTRAINT "StudentTakesClass_studentID_fkey";

-- AlterTable
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_pkey",
DROP COLUMN "assignmentID",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Assistant" DROP CONSTRAINT "Assistant_pkey",
DROP COLUMN "assistantID",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Assistant_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Class" DROP CONSTRAINT "Class_pkey",
DROP COLUMN "classID",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Class_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Instructor" DROP CONSTRAINT "Instructor_pkey",
DROP COLUMN "instructorID",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Instructor_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Post" DROP CONSTRAINT "Post_pkey",
DROP COLUMN "postID",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Student" DROP CONSTRAINT "Student_pkey",
DROP COLUMN "studentID",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Student_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "StudentTakesClass" ADD CONSTRAINT "StudentTakesClass_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentTakesClass" ADD CONSTRAINT "StudentTakesClass_classID_fkey" FOREIGN KEY ("classID") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstructorTeachesClass" ADD CONSTRAINT "InstructorTeachesClass_instructorID_fkey" FOREIGN KEY ("instructorID") REFERENCES "Instructor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstructorTeachesClass" ADD CONSTRAINT "InstructorTeachesClass_classID_fkey" FOREIGN KEY ("classID") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssistantTeachesClass" ADD CONSTRAINT "AssistantTeachesClass_assistantID_fkey" FOREIGN KEY ("assistantID") REFERENCES "Assistant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssistantTeachesClass" ADD CONSTRAINT "AssistantTeachesClass_classID_fkey" FOREIGN KEY ("classID") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentHasAssignment" ADD CONSTRAINT "StudentHasAssignment_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentHasAssignment" ADD CONSTRAINT "StudentHasAssignment_assignmentID_fkey" FOREIGN KEY ("assignmentID") REFERENCES "Assignment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassHasAssignment" ADD CONSTRAINT "ClassHasAssignment_classID_fkey" FOREIGN KEY ("classID") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassHasAssignment" ADD CONSTRAINT "ClassHasAssignment_assignmentID_fkey" FOREIGN KEY ("assignmentID") REFERENCES "Assignment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassHasPost" ADD CONSTRAINT "ClassHasPost_classID_fkey" FOREIGN KEY ("classID") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassHasPost" ADD CONSTRAINT "ClassHasPost_postID_fkey" FOREIGN KEY ("postID") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
