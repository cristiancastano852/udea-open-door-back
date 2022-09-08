import express from 'express';
import { PrismaClient } from '@prisma/client';

const courseContentCreate = express.Router();
const prisma = new PrismaClient();

/** 
 * @swagger
 * tags:
 *  name: Create Course Content
 *  description: Endpoint to create content for a course
 */
/**
 * @swagger
 * paths:
 *  /createContent/courseId:
 *   post:
 *      summary: As an administrator you can create a course
 *      parameters:
 *          - in: params            
 *            name: courseId
 *            schema:
 *              type: string
 *            description: The id of the course to get
 *      requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                         type: object
 *                         properties:
 *                            name:
 *                              type: string
 *                              example: Video Habilidades Para la Vida
 *                            description:
 *                             type: string
 *                             example: Este es un video para el curso de Habilidades
 *                            typeFile:
 *                             type: string
 *                             example: video
 *                            file:
 *                             type: string
 *                             example: https://www.youtube.com/watch?v=dQw4w9WgXcQ
 * 
 *      tags: [Create Course Content]
 *      responses:
 *         200:
 *           description: It was possible to create the course content
 *         500:
 *           description: Unexpected error      
 */

courseContentCreate.route('/createContent/:courseId').post(createCourseContent());

function createCourseContent() {

    return async (req, res) => {
        try {
            const courseContentData = req.body;
            const courseId = req.params.courseId;
            const courseContent = await prisma.CourseContent.create({
                data: {
                    name: courseContentData.name,
                    description: courseContentData.description,
                    courseId: courseId,
                    typeFile: courseContentData.typeFile,
                    file: courseContentData.file
                },
            });
            res.status(200).json({
                message: 'Course content created successfully',
            })
        } catch {
            res.status(500).json({
                status: 'A error - - 500: Unexpected error',
            })
        }
    }
}
export { courseContentCreate };