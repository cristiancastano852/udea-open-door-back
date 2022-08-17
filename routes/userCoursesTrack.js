import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const userCoursesTrackRoutes = express.Router();

userCoursesTrackRoutes.route('/userCoursesTrack').get(async (req, res) => {
    const userData = req.body;
    const userCoursesTrack = await prisma.courseTrack.findUnique({
        where: {
                id: userData.userId
        }
    })
    res.status(200).json({
        c,
        status: 'OK'
    })
});

export { userCoursesTrackRoutes }