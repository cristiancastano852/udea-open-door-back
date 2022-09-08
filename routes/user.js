import express from 'express';
import { PrismaClient } from '@prisma/client';

const userRoutes = express.Router();
const prisma = new PrismaClient();

// Si se logra el login busca, o que busque y diga si encuentra o no?

userRoutes.route('/user').get(getUser());

function getUser() {
    return async (req, res) => {
        try {
            const email = req.body.email;
            let user = await prisma.user.findUnique({

                where: {
                    email:email,
                },

                select: {
                    id: true,
                },
            });
            let admin = await prisma.admin.findUnique({

                where: {
                    email:email,
                },

                select: {
                    id: true,
                },
            });
            if (user === null && admin === null) {
                res.status(204).json({
                    status: 'No existe',
                })
            } else if (user != null){
                res.status(200).json({
                    user, rol: 'user',
                })
            } else if (admin != null){
                res.status(200).json({
                    admin, rol: "admin",
                })
            }
        } catch {
            res.status(500).json({
                status: 'Error 5500: Unexpected error',
            })
        }
    }
}

export { userRoutes };