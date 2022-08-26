import express from 'express';
import { PrismaClient } from '@prisma/client';

const cursoRoutes = express.Router();
const prisma = new PrismaClient();

cursoRoutes.route('/course/:courseId').get(course());

function course() {
    return async (req, res) => {
        try {
            const courseId = req.params.courseId;
            let course = await prisma.Course.findUnique({

                where: {
                    id: courseId,
                },

                select: {
                    title: true,
                    description: true,
                    createdAt: true,
                    courseContents: {
                        select: {
                            name: true,
                            description: true,
                            typeFile: true,
                            file: true,
                        },
                    },
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
export { cursoRoutes };