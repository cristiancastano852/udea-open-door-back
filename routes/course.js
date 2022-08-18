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
 *  /courses?offset=0&limit=1:
 *   get:
 *      parameters:
 *          - in: query
 *            name: offset
 *            schema:
 *              type: integer
 *            description: The number of courses to skip before starting to collect
 *          - in: query
 *            name: limit
 *            schema:
 *              type: integer
 *            description: The number of courses to return
 *      summary: Get required courses per page ragardless of track
 *      tags: [Courses]
 *      responses:
 *          200:
 *              description: It was possible to connect to the database and obtain the courses           
 *              content:    
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              title:
 *                                  type: string
 *                                  example: Curso de formacion
 *                              description:
 *                                  type: string
 *                                  example: Este es un curso de formacion
 *                                 
 *          500:
 *              description: There was an unexpected error reaching connecting to the database
 *          
 */
cursosRoutes.route('/courses').get(paginatedCourses()
/* Otra forma no se en que cambia
    ,(req, res) => {
        res.json(res.paginatedCourses)
    }
*/
);

function paginatedCourses() {
    return async (req, res) => {
        try {
            const limit = parseInt(req.query.limit);
            const offset = parseInt(req.query.offset);
            const course = await prisma.course.findMany({
                skip: offset,
                take: limit,
                select: {
                    title: true,
                    description: true,
                },
                orderBy: {
                    title: 'asc',
                },
            });
            console.log(course);
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
export { cursosRoutes };