import { Router, Request, Response } from "express";
const nodemailer = require('nodemailer');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
require('dotenv').config();

export const emailRouter = Router();

emailRouter.post('/email', rejectUnauthenticated, (req: any, res: any) => {
    let mailTransporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: 'gridironpickem@outlook.com',
            pass: process.env.EMAIL_PASSWORD
        }
    });

    let mailDetails = {
        from: 'Grid Iron Pickem <gridironpickem@outlook.com>',
        to: req.body.emailAddress,
        subject: 'You are invited to Grid Iron!',
        text: 'This field is used for plain text support only',
        html: `<p>You have been invited to Grid Iron Pickem! League: ${req.body.leagueName}</p>
                <section>Please login or register:<a href='http://localhost:3000/#/register'> New User</a></section>
                <section>Then click:<a href='http://localhost:3000/#/detail/${req.body.leagueId}'> here<a/></section>`
    };

    mailTransporter.sendMail(mailDetails, (err: any, data: any) => {
        if (err) {
            console.log('error in sending mail:', err);
            res.sendStatus(500)
        } else {
            console.log('email sent successfully');
            res.sendStatus(200)
        };
    });
})