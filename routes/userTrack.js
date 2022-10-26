import express from 'express';
import { PrismaClient } from '@prisma/client';

const userTrack = express.Router();
const prisma = new PrismaClient();

/** 
 * @swagger
 * tags:
 *  name: User Course Status
 *  description: Endpoint to get the status of a user's courses
 */
/**
 * @swagger
 * paths:
 *  /courses/userId:
 *   get:
 *      parameters:
 *          - in: params            
 *            name: userId
 *            schema:
 *              type: string
 *            description: The id of the user to track
 *          - in: query
 *            name: filter
 *            schema:
 *              type: string
 *            description: The filter to the courses, can be AbleToStart, InProgress or Finished
 *      summary: Get the user's courses to track them
 *      tags: [User Course Status]
 *      responses:
 *          200:
 *              description: It was possible to connect to the database and obtain the user's courses status           
 *              content:    
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              title:
 *                                  type: string
 *                                  example: Este curso enseña sobre habilidades para la vida
 *                              description:
 *                                  type: string
 *                                  example: Este curso enseña sobre habilidades para la vida
 *                              status:
 *                                  type: string
 *                                  example: InProgress
 *                              inscriptionDate:
 *                                  type: string
 *                                  example: 2022-12-13T23:59:59.SSSZ
 *                              finishDate:
 *                                  type: string
 *                                  example: 2022-12-13T23:59:59.SSSZ                    
 *          
 *          204:
 *              description: No user's courses with that Id, doesn't need to navigate away from its current page
 *              
 *          500:
 *              description: There was an unexpected error reaching connecting to the database
 *          
 */

userTrack.route('/courses/:userId').get(status());

function status() {
    return async (req, res) => {

        try {
            const userId = req.params.userId;
            console.log(userId);
            let userCourses = await prisma.userCourse.findMany({
                where: {
                    userId: userId,
                    OR: [
                        { status: (req.query.filter != null ? req.query.filter : "AbleToStart") },
                        { status: (req.query.filter != null ? req.query.filter : "InProgress") },
                        { status: (req.query.filter != null ? req.query.filter : "Finished") },
                    ],
                },

                select: {
                    status: true,
                    inscriptionDate: true,
                    finishDate: true,
                    Course: {
                        select: {
                            id: true,
                            title: true,
                            description: true,
                        },
                    },
                }
            });

            if (userCourses.length === 0) {
                res.status(204).json({
                    status: 'No existe',
                })
            } else {
                res.status(200).json({
                    userCourses,
                })
            }
        } catch {
            res.status(500).json({
                status: 'Unexpected error',
            })
        }
    }
}
export { userTrack };