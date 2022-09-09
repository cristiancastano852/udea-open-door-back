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
 */

cursoRoutes.route('/course/detail/:courseId').get(course());

function course() {
    return async (req, res) => {
        try {
            const courseId = req.params.courseId;
            const userId = req.body.userId;
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

                let course = await prisma.course.findUnique({
                    where: {
                        id: courseId,
                    },
                    select: {
                        title:true,
                        description:true
                    }
                })

                res.status(200).json({
                    course, status: 'AbleToStart'
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