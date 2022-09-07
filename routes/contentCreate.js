import express from 'express';
import { PrismaClient } from '@prisma/client';
import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';
import path from 'path';
import fs from 'fs';
import { Console } from 'console';

const contentCreate = express.Router();
const prisma = new PrismaClient();

const CLIENT_ID = "";
const CLIENT_SECRET = "";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFREESH_TOKEN = "";

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/contacts.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');


contentCreate.route('/createContent').get(test2());

function test2() {
    return async (req, res) => {
        try {
            const content = await fs.readFile(TOKEN_PATH);
            const credentials = JSON.parse(content);
            return google.auth.fromJSON(credentials);
          } catch (err) {
            return null;
          }
    }
}

function test() {

    return async (req, res) => {

        const auth = new GoogleAuth({ scopes: 'https://www.googleapis.com/auth/drive' });
        const service = google.drive({ version: 'v3', auth });

        const filePath = path.join('C:/Users/victo/Desktop/test.jpg');

        console.log(auth)

        console.log(filePath);

        try {

            const response = await service.files.create({
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
                    type: 'anyone'
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
