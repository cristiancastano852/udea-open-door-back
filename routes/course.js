import express from 'express';
import { PrismaClient } from '@prisma/client';

const cursoRoutes = express.Router();
const prisma = new PrismaClient();

cursoRoutes.route('/course/detail/:courseId').get(course());

function course() {
    return async (req, res) => {
        console.log("probandooooo1");
        try {
            console.log("probandooooo1");
            const courseId = req.params.courseId;
            const userId = req.body.userId;
            console.log("probandooooo");
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
                                    //name: true,
                                    // description: true,
                                    // contentType: true,
                                     contentType: true,
                                    //url: true
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