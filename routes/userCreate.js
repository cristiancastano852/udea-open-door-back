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
 *      requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                         type: object
 *                         properties:
 *                            userEmai:
 *                              type: string
 *                              example: userEmail@email.com
 *                            name:
 *                             type: string
 *                             example: Nombre de usuario
 *                            about:
 *                             type: string
 *                             example: Short description about the user
 *                            age:
 *                             type: number
 *                             example: 25
 *                            avatar:
 *                             type: url
 *                             example: https://ih1.redbubble.net/image.3370023197.9328/st,small,507x507-pad,600x600,f8f8f8.jpg
 *                            expectations:
 *                             type: string
 *                             example: The expectations of the user
 *                            linkedin:
 *                             type: url
 *                             example: https://www.linkedin.com/in/
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

        const body = req.body;

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
                body, status: 'A error - - 500: Unexpected error',
            })
        }
    }
}
export { userCreate };
