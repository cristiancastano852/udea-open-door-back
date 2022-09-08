import express from 'express';
import { PrismaClient } from '@prisma/client';

const courseCreate = express.Router();
const prisma = new PrismaClient();
const adminId = 'cl7thk3lm0026mkmkayr011rp';

/** 
 * @swagger
 * tags:
 *  name: Create Course
 *  description: Endpoint to create a course
 */
/**
 * @swagger
 * paths:
 *  /course/create:
 *   post:
 *      summary: As an administrator you can create a course
 *      requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                         type: object
 *                         properties:
 *                            title:
 *                              type: string
 *                              example: Curso de formacion
 *                            description:
 *                             type: string
 *                             example: Este es un curso de formacion
 *                            adminId:
 *                             type: string
 *                             example: cl70pwhnd00315sbktoxy1av6
 *      tags: [Create Course]
 *      responses:
 *         200:
 *           description: It was possible to create the course
 *         500:
 *           description: Unexpected error
 *     
 * 
 *          
 */

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
                message: 'Course created successfully',
            })
        } catch {
            res.status(500).json({
                status: 'A error - - 500: Unexpected error',
            })
        }
    }
}
export { courseCreate };