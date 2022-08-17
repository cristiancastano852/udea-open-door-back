import express from 'express';
import { PrismaClient } from '@prisma/client';

const cursosRoutes = express.Router();
const prisma = new PrismaClient();

cursosRoutes.route('/courses').get(async (req, res) => {
        const course = await prisma.course.findMany();
        console.log(course);
        res.status(200).json({
            course,
        })
});

export { cursosRoutes };