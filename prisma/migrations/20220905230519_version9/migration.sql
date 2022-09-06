/*
  Warnings:

  - You are about to drop the column `file` on the `CourseContent` table. All the data in the column will be lost.
  - You are about to drop the column `typeFile` on the `CourseContent` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - Added the required column `contentType` to the `CourseContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `CourseContent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CourseContent" DROP COLUMN "file",
DROP COLUMN "typeFile",
ADD COLUMN     "contentType" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password";
