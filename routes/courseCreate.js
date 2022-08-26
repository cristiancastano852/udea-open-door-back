import express from 'express';
import { PrismaClient } from '@prisma/client';

const courseCreate = express.Router();
const prisma = new PrismaClient();
const adminId = 'cl70pwhnd00315smktoxy1av6';

courseCreate.route('/course/create').post(createCourse());

function createCourse() {
    return async (req, res) => {
        try {
            const courseData = req.body;
            const course = await prisma.course.create({
                data: {
                    title: courseData.title,
                    description: courseData.description,
                    adminId: adminId,
                },
            });
            res.status(200).json({
                course,
            })
        } catch {
            res.status(500).json({
                status: 'Unexpected error',
            })
        }
    }
}
export { courseCreate };