-- AlterTable
ALTER TABLE "Assignment" ADD COLUMN     "submitFiles" TEXT[];

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "hidden" BOOLEAN NOT NULL DEFAULT true,
    "title" TEXT NOT NULL DEFAULT E'Class Post',
    "body" TEXT,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
