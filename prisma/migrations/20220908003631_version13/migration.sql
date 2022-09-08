/*
  Warnings:

  - You are about to drop the column `description` on the `CourseContent` table. All the data in the column will be lost.
  - You are about to drop the column `typeContent` on the `CourseContent` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `CourseContent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CourseContent" DROP COLUMN "description",
DROP COLUMN "typeContent",
DROP COLUMN "url";
