/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `CourseTrack` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `CourseTrack` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CourseTrack" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CourseTrack_name_key" ON "CourseTrack"("name");
