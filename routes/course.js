import express from 'express';
import { PrismaClient } from '@prisma/client';

const cursosRoutes = express.Router();
const prisma = new PrismaClient();

/** 
 * @swagger
 * tags:
 *  name: Courses
 *  description: API to get all courses
 */
/**
 * @swagger
 * paths:
 *  /courses:
 *   get:
 *      summary: Show all the avaliable courses regardless of which rout the belong to
 *      tags: [Courses]
 *      responses:
 *          200:
 *              description: Return Courses.json, reachable database and was able to get the courses
 *          500:
 *              description: Return Unexpected error reaching the database
 */
cursosRoutes.route('/courses').get(async (req, res) => {
    try {
        const course = await prisma.course.findMany();
        console.log(course);
        res.status(200).json({
            course,
        })
    } catch {
        res.status(500).json({
            status: 'Unexpected error',
        })
    }
});

export { cursosRoutes };