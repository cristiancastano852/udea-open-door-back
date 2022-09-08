import express from 'express';
import { PrismaClient } from '@prisma/client';

const userRoutes = express.Router();
const prisma = new PrismaClient();

/** 
 * @swagger
 * tags:
 *  name: Id/Role
 *  description: Endpoint to get the id and role usign the email
 */
/**
 * @swagger
 * paths:
 *  /getRole:
 *   get:
 *      parameters: 
 *         - in: body
 *           name: email
 *           schema:
 *            type: object
 *            properties:
 *              email:
 *               type: string
 *               example: user@gmail.com
 *           description: This parameter is the email to check
 *      summary: You get the id and role of an email
 *      tags: [Id/Role]
 *      responses:
 *          200:
 *              description: It was possible to connect to the database and obtain the the id and role           
 *              content:    
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              id:
 *                                  type: string
 *                                  example: cl70pwhnd00315sbktoxy1av6
 *                              role:
 *                                  type: string
 *                                  example: user
 *     
 *          204:
 *              description: No user or admin with that email, doesn't need to navigate away from its current page
 *              
 *          500:
 *              description: There was an unexpected error reaching connecting to the database
 */

userRoutes.route('/getRole').get(getUser());

function getUser() {
    return async (req, res) => {
        try {
            const email = req.body.email;
            let user = await prisma.user.findUnique({

                where: {
                    email: email,
                },

                select: {
                    id: true,
                },
            });
            let admin = await prisma.admin.findUnique({

                where: {
                    email: email,
                },

                select: {
                    id: true,
                },
            });
            if (user === null && admin === null) {
                res.status(204).json({
                    status: 'No existe',
                })
            } else if (admin != null) {
                res.status(200).json({
                    admin, rol: "admin",
                })
            } else
                if (user != null) {
                    res.status(200).json({
                        user, rol: 'user',
                    })
                } else {
                    res.status(204).json({
                        status: 'No existe',
                    })
                }
        } catch {
            res.status(500).json({
                status: 'A error - - 500: Unexpected error',
            })
        }
    }
}

export { userRoutes };