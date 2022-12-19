import express, { Router, Request, Response } from "express";
import { nextTick } from "process";
const pool = require('../modules/pool');
const encryptLib = require('../modules/encryption');
const userStrategy = require('../strategies/user.strategy')
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


export const userRouter = Router();


// get route for all user info
userRouter.get('/', rejectUnauthenticated, (req: Request, res: Response) => {
    console.log('in router.get');
    pool.query('SELECT * FROM "user";').then((results: any) => {
        console.log('results.data', results.rows);
        res.send(req.user);
    }).catch((error: any) => {
        console.log('error GETing, ', error);
        res.sendStatus(500)
    });

});

// register a new user
userRouter.post('/register', async (req: Request, res: Response) => {
    const { username, password } = req?.body;
    const hashedPassword: string = encryptLib.encryptPassword(req.body.password);

    //checks if data being passed is correct before querying DB
    if (!username || !password || typeof username !== "string" || typeof password !== "string") {
        res.send("Improper values");
    };;



    pool.query(`INSERT INTO "user" ("username", "password") VALUES ($1, $2)`, [username, hashedPassword])
        .then((results: any) => {
            res.sendStatus(200)
        }).catch((error: any) => {
            console.log('error in REGISTERING', error);
            res.sendStatus(500);
        });
});

// login
userRouter.post('/login', userStrategy.authenticate('local'), (req: Request, res: Response) => {
    console.log('in post /login, req.body:', req.body);
    res.sendStatus(200);
});

// logout
userRouter.post('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.sendStatus(200);
    });
});