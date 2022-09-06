import express from 'express';
import { PrismaClient } from '@prisma/client';

const cursoRoutes = express.Router();
const prisma = new PrismaClient();

/** 
 * @swagger
 * tags:
 *  name: Course
 *  description: Endpoint to get a course
 */
/**
 * @swagger
 * paths:
 *  /course/:courseId:
 *   get:
 *      body:
 *          - in: body            
 *            name: courseId
 *            schema:
 *              type: string
 *            description: The id of the course to get
 *          - in: body
 *            name: userId
 *            schema:
 *              type: string
 *            description: The id of the user 
 *      summary: Get a specific course with all attributes and content
 *      tags: [Course]
 *      responses:
 *          200:
 *              description: It was possible to connect to the database and obtain the course           
 *              content:    
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: AbleToStart
 *                              title:
 *                                  type: string
 *                                  example: Habilidades para la vida
 *                              description:
 *                                  type: string
 *                                  example: Este curso enseña sobre habilidades para la vida
 *                              courseContents:
 *                                  type: json
 *                                  example:
 *                                      name: Habilidades para la vida
 *                                      description: Documento que tiene las habilidades para la vida
 *                                      contentType: resource
 *                                      url: https://drive.google.com/uc?id=1K-xVrXnuQAbdELzzq1c7Y_PKECnImm5a&export=download
 *          
 *          204:
 *              description: No course with that id for the user id, doesn't need to navigate away from its current page
 *              
 *          500:
 *              description: There was an unexpected error reaching connecting to the database
 *          
 */

cursoRoutes.route('/course/:courseId').get(course());

function course() {
    return async (req, res) => {
        try {
            const courseId = req.params.courseId;
            const userId = 'cl7pdqmdk0076wwmkvrgr53us';
            console.log(courseId)
            let course = await prisma.userCourse.find({

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
                                    contentType: true,
                                    url: true,
                                },
                            },
                        },
                    },
                },
            });
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
                status: 'Unexpected error',
            })
        }
    }
}
export { cursoRoutes };