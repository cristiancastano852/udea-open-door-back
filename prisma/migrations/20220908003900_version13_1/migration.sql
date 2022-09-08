/*
  Warnings:

  - Added the required column `description` to the `CourseContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `file` to the `CourseContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeFile` to the `CourseContent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CourseContent" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "file" TEXT NOT NULL,
ADD COLUMN     "typeFile" TEXT NOT NULL;
