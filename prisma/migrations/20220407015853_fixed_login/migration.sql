/*
  Warnings:

  - A unique constraint covering the columns `[userID]` on the table `Assistant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userID]` on the table `Instructor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userID]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Assistant_userID_key" ON "Assistant"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "Instructor_userID_key" ON "Instructor"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "Student_userID_key" ON "Student"("userID");
