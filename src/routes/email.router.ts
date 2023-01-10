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

    // TODO: update email links when grid iron gets hosted
    let mailDetails = {
        from: 'Grid Iron Pickem <gridironpickem@outlook.com>',
        to: req.body.emailAddress,
        subject: 'You are invited to Grid Iron!',
        text: `You have been invited to GridIron.Pickem. Please create an account then search for the league with invite code: ${req.body.inviteCode}`,
        html: `<h2>You have been invited to Grid Iron Pickem!</h2>
                <h3>League: ${req.body.leagueName}</h3>
                <h4>Please login or register:<a href='http://localhost:3000/#/home'> GridIron.Pickem</a></h4>
                <h4>Then <a href='http://localhost:3000/#/detail/${req.body.leagueId}'> find the league <a/>by invite code: ${req.body.inviteCode}</h4>`
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