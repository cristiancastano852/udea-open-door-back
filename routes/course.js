import express from 'express';
import { PrismaClient } from '@prisma/client';

const cursoRoutes = express.Router();
const prisma = new PrismaClient();

cursoRoutes.route('/course/detail/:courseId').get(course());

function course() {
    return async (req, res) => {
        try {
            const courseId = req.params.courseId;
            const userId = "cl7sbco760080bsmkmi7hvv8k";
            console.log(courseId);
            console.log(userId);
            let course = await prisma.userCourse.findMany({
                where: {
                    courseId: courseId,
                    userId: userId,
                },
                select: {
                    status: true,
                    Course: {
                        select: {
                            title: true,
                            description: true,
                            courseContents: {
                                select: {
                                    name: true,
                                    description: true,
                                    typeContent: true,
                                    url: true
                                },
                            },
                        },
                    },
                },
            });
            console.log("Funciona");
            if (course === null) {
                res.status(204).json({
                    status: 'No existe',
                })
            } else {
                res.status(200).json({
                    course,
                })
            }
        } catch {
            res.status(500).json({
                status: 'A error - - 500: Unexpected error',
            })
        }
    }
}
export { cursoRoutes };