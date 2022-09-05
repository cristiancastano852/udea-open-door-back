import express from 'express';
import { PrismaClient } from '@prisma/client';
import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';
import path from 'path';
import fs from 'fs';

const contentCreate = express.Router();
const prisma = new PrismaClient();

const CLIENT_ID = "";
const CLIENT_SECRET = "";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFREESH_TOKEN = "";

contentCreate.route('/createContent').get(test());

function test() {

    return async (req, res) => {

        const oauth2Client = new google.auth.OAuth2(
            CLIENT_ID,
            CLIENT_SECRET,
            REDIRECT_URI
        );

        oauth2Client.setCredentials({ refresh_token: REFREESH_TOKEN });

        const drive = google.drive({
            version: 'v3',
            auth: oauth2Client
        });

        const filePath = path.join('C:/Users/victo/Desktop/test.jpg');

        console.log(filePath);

        try {

            const response = await drive.files.create({
                requestBody: {
                    name: 'Photo.jpg',
                    mimeType: 'image/jpg'
                },
                media: {
                    mimeType: 'image/jpg',
                    body: fs.createReadStream(filePath)
                }
            });

            const fileId = response.data.id

            await drive.permissions.create({
                fileId: fileId,
                requestBody: {
                    role: 'reader',
                    type:'anyone'
                }
            })

            const fileLink = await drive.files.get({
                fileId: fileId,
                fields: 'webViewLink, webContentLink',
            });

           const link = fileLink.data.webContentLink;

            res.status(200).json({
                link,
            })

        } catch (error) {
            res.status(500).json({
                status: 'Unexpected error',
            })
        }
    }
}


export { contentCreate };
