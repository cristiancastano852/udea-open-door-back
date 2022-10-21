import express from 'express';
import { PrismaClient } from '@prisma/client';

const cursoRoutes = express.Router();
const prisma = new PrismaClient();

/** 
 * @swagger
 * tags:
 *  name: User Course
 *  description: Endpoint to get a user course
 */
/**
 * @swagger
 * paths:
 *  /course/detail/courseId:
 *   get:
 *      parameters:
 *          - in: params            
 *            name: courseId
 *            schema:
 *              type: string
 *            description: The id of the course to get
 *      summary: Get a specific user course with all attributes and content
 *      tags: [User Course]
 *      responses:
 *          200:
 *              description: It was possible to connect to the database and obtain the user course           
 *              content:    
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              title:
 *                                  type: string
 *                                  example: Habilidades para la vida
 *                              description:
 *                                  type: string
 *                                  example: Este curso enseña sobre habilidades para la vida
 *                              status:
 *                                  type: string
 *                                  example: InProgress
 *                              courseContents:
 *                                  type: json
 *                                  example:
 *                                      name: Habilidades para la vida
 *                                      description: Recurso que tiene contenido sobre las habilidades para la vida
 *                                      typeFile: resource
 *                                      file: https://drive.google.com/uc?export=download&id=1IExKZFxq3-QZ4qRnigm7MBY0QhEQXbF7
 *          
 *          204:
 *              description: No user course with that Id, doesn't need to navigate away from its current page
 *              
 *          500:
 *              description: There was an unexpected error reaching connecting to the database
 * 
 *  /course/detail/courseId/remove:
 *   delete:
 *      parameters:
 *          - in: params            
 *            name: courseId
 *            schema:
 *              type: string
 *            description: The id of the course to get
 *      summary: Remove a specific user course that is not finished
 *      tags: [User Course]
 *      responses:
 *          200:
 *              description: It was possible to connect to the database and remove the user course           
 *          
 *          204:
 *              description: The user course with that Id has a status that cant be removed, doesn't need to navigate away from its current page
 *              
 *          500:
 *              description: There was an unexpected error reaching connecting to the database
 *          
 */

cursoRoutes.route('/course/detail/:courseId').get(course());

cursoRoutes.route('/course/detail/:courseId/remove').delete(deleteCourse());

function course() {
    return async (req, res) => {
        try {
            const courseId = req.params.courseId;
            const userId = req.headers.userid;

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
                                    typeFile: true,
                                    file: true,
                                },
                            },
                        },
                    },
                },
            });
            if (course === null || course.length === 0) {

                const userCourse = await prisma.userCourse.create({
                    data: {
                        userId: userId,
                        courseId: courseId,
                        status: "AbleToStart",
                        finishDate: "1970-01-01T00:00:00.000Z"
                    }
                });

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
                                        typeFile: true,
                                        file: true,
                                    },
                                },
                            },
                        },
                    },
                });

                res.status(200).json({
                    course,
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

function deleteCourse() {
    return async (req, res) => {
        try {
            const courseId = req.params.courseId;
            const userId = req.headers.userid;

            let course = await prisma.userCourse.findMany({
                where: {
                    courseId: courseId,
                    userId: userId,
                },
                select: {
                    status: true,
                },
            });

            if (course[0].status != "Finished") {
                try {
                    await prisma.userCourse.deleteMany({
                        where: {
                            courseId: courseId,
                            userId: userId,
                            OR: [
                                { status: "AbleToStart" },
                                { status: "InProgress" },
                            ]
                        },
                    });
                    res.status(200).send({ status: 'Successfully removed' });
                } catch {
                    res.status(500).send({ status: 'Unexpected error' });
                }

            } else {
                res.status(204).send({ status: 'Cant be removed' });
            }
        } catch {
            res.status(500).send({ status: 'Unexpected error' });
        }
    }
}
export { cursoRoutes };