import express from 'express';
import { PrismaClient } from '@prisma/client';

const userProfileRoutes = express.Router();
const prisma = new PrismaClient();

/** 
 * @swagger
 * tags:
 *  name: User Profile
 *  description: Endpoint to get the user information
 */
/**
 * @swagger
 * paths:
 *  /userProfile/:userId:
 *   get:
 *      parameters:
 *          - in: body
 *            name: userId
 *            schema:
 *             type: object
 *             properties:
 *              userId:
 *               type: string
 *               example: cl7thojl40138mkmkczusfmml
 *            description: The id of the user 
 *      summary: Get the profile information for a user
 *      tags: [User Profile]
 *      responses:
 *          200:
 *              description: It was possible to connect to the database and obtain the user           
 *              content:    
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: User Name
 *                              avatar:
 *                                  type: string
 *                                  example: https://ih1.redbubble.net/image.3370038982.9683/st,small,507x507-pad,600x600,f8f8f8.jpg
 *                              about:
 *                                  type: string
 *                                  example: Im a user
 *                              expectations:
 *                                  type: string
 *                                  example: To complete the courses
 *                              linkedin: 
 *                                  type: string
 *                                  example: https://www.linkedin.com/in/
 *                              age:
 *                                  type: string
 *                                  example: 21
 *                              joinDate:
 *                                  type: string
 *                                  example: 2022-12-13T23:59:59.SSSZ
 *                              
 *          204:
 *              description: No user with that id, doesn't need to navigate away from its current page
 *              
 *          500:
 *              description: There was an unexpected error reaching connecting to the database
 * 
 * /userProfile/:userId/edit:
 *   put:
 *      parameters:
 *          - in: body
 *            name: userId
 *            schema:
 *             type: object
 *             properties:
 *              userId:
 *               type: string
 *               example: cl7thojl40138mkmkczusfmml
 *            description: The id of the user 
 *          - in: query
 *            name: name
 *            schema:
 *              type: string
 *            description: The name of the user
 *          - in: query
 *            name: about
 *            schema:
 *              type: string
 *            description: A short description about the user
 *          - in: query
 *            name: age
 *            schema:
 *              type: int
 *            description: The age of the user
 *          - in: query
 *            name: avatar
 *            schema:
 *              type: string
 *            description: The link to the avatar of the user
 *          - in: query
 *            name: expectations
 *            schema:
 *              type: string
 *            description: The expectations of the user
 *          - in: query
 *            name: linkedin
 *            schema:
 *              type: string
 *            description: The link to the linkedin of the user
 *      summary: Edit the profile information for a user
 *      tags: [User Profile]
 *      responses:
 *          200:
 *              description: It was possible to connect to the database and edit the user           
 *              content:    
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: User Name
 *                              avatar:
 *                                  type: string
 *                                  example: https://ih1.redbubble.net/image.3370038982.9683/st,small,507x507-pad,600x600,f8f8f8.jpg
 *                              about:
 *                                  type: string
 *                                  example: Im a user
 *                              expectations:
 *                                  type: string
 *                                  example: To complete the courses
 *                              linkedin: 
 *                                  type: string
 *                                  example: https://www.linkedin.com/in/
 *                              age:
 *                                  type: string
 *                                  example: 21
 *                              
 *          204:
 *              description: No user with that id, doesn't need to navigate away from its current page
 *              
 *          500:
 *              description: There was an unexpected error reaching connecting to the database
 *          
 */


userProfileRoutes.route('/userProfile/:userId').get(userProfile());

userProfileRoutes.route('/userProfile/:userId/edit').put(editUserProfile());


function userProfile() {
    return async (req, res) => {
        try {
            const userId = req.params.userId;
            let user = await prisma.user.findUnique({

                where: {
                    id: userId,
                },

                select: {
                    name: true,
                    avatar: true,
                    about: true,
                    expectations: true,
                    linkedin: true,
                    age: true,
                    joinDate: true,
                },
            });
            if (user === null) {
                res.status(204).json({
                    status: 'No existe',
                })
            } else {
                res.status(200).json({
                    user,
                })
            }
        } catch {
            res.status(500).json({
                status: 'Unexpected error',
            })
        }
    }
}

function editUserProfile() {
    return async (req, res) => {
        try {
            const userId = req.params.userId;
            const { name, avatar, about, expectations, linkedin, age } = req.query;

            let userUpdate = await prisma.user.update({

                where: {
                    id: userId,
                },

                data: {
                    name: name,
                    avatar: avatar,
                    about: about,
                    expectations: expectations,
                    linkedin: linkedin,
                    age: Number(age),
                },
            });

            if (userUpdate === null) {
                res.status(204).json({
                    status: 'No existe',
                })
            } else {
                res.status(200).json({
                    userUpdate,
                })
            }
        } catch {
            res.status(500).json({
                status: 'Unexpected error',
            })
        }
    }
}

export { userProfileRoutes };
