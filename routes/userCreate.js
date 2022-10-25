import express from 'express';
import { PrismaClient } from '@prisma/client';

const userCreate = express.Router();
const prisma = new PrismaClient();

/** 
 * @swagger
 * tags:
 *  name: Create User
 *  description: Endpoint to create a user
 */
/**
 * @swagger
 * paths:
 *  /createUser:
 *   post:
 *      parameters:
 *          - in: body
 *            name: userEmail
 *            schema:
 *             type: object
 *             properties:
 *              userEmail:
 *               type: string
 *               example: userEmail@email.com
 *            description: The email of the user to create
 *          - in: body
 *            name: name
 *            schema:
 *              type: string
 *            description: The name of the user
 *          - in: body
 *            name: about
 *            schema:
 *              type: string
 *            description: A short description about the user
 *          - in: body
 *            name: age
 *            schema:
 *              type: int
 *            description: The age of the user
 *          - in: body
 *            name: avatar
 *            schema:
 *              type: string
 *            description: The link to the avatar of the user
 *          - in: body
 *            name: expectations
 *            schema:
 *              type: string
 *            description: The expectations of the user
 *          - in: body
 *            name: linkedin
 *            schema:
 *              type: string
 *            description: The link to the linkedin of the user
 *      summary: When you sign up you will be added as a user
 *      tags: [Create User]
 *      responses:
 *         200:
 *           description: It was possible to create the user
 *           content:    
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              id:
 *                                  type: string
 *                                  example: cl213yf12345fkflkg123
 *         500:
 *           description: Unexpected error
 *     
 * 
 *          
 */

userCreate.route('/createUser').post(createUser());

function createUser() {

    return async (req, res) => {

        try {
            const { userEmail, name, avatar, about, expectations, linkedin, age } = req.body;
            const user = await prisma.User.create({
                data: {
                    email: userEmail,
                    name: name,
                    about: about,
                    age: Number(age),
                    expectations: expectations,
                    linkedin: linkedin,
                    avatar: avatar
                },
            });
            const userId = user.id;
            res.status(200).json({
                userId, message: 'User created successfully',
            })
        } catch (error) {
            console.log(error)
             res.status(500).json({
                status: 'A error - - 500: Unexpected error',
            })
        }
    }
}
export { userCreate };
