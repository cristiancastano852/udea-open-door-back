/*
  Warnings:

  - You are about to drop the column `userCourseTrackId` on the `Course` table. All the data in the column will be lost.
  - Added the required column `courseTrackId` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseTrackId` to the `UserCourseTrack` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_userCourseTrackId_fkey";

-- DropForeignKey
ALTER TABLE "UserCourseTrack" DROP CONSTRAINT "UserCourseTrack_userId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "userCourseTrackId",
ADD COLUMN     "courseTrackId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserCourseTrack" ADD COLUMN     "courseTrackId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "CourseTrack" (
    "id" TEXT NOT NULL,
    "numCourses" INTEGER NOT NULL,

    CONSTRAINT "CourseTrack_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserCourseTrack" ADD CONSTRAINT "UserCourseTrack_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCourseTrack" ADD CONSTRAINT "UserCourseTrack_courseTrackId_fkey" FOREIGN KEY ("courseTrackId") REFERENCES "CourseTrack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_courseTrackId_fkey" FOREIGN KEY ("courseTrackId") REFERENCES "CourseTrack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
