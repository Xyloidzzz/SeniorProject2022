/*
  Warnings:

  - You are about to drop the column `description` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `author` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Assignment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AssignmentType" AS ENUM ('BASIC', 'LAB', 'QUIZ', 'EXAM');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_classId_fkey";

-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "description",
ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "body" TEXT,
ADD COLUMN     "shortDescription" TEXT,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "type" "AssignmentType" NOT NULL DEFAULT E'BASIC';

-- DropTable
DROP TABLE "Post";
