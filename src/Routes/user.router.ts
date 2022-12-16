import express, { Router, Request, Response } from "express";
const pool = require('../modules/pool');
const encryptLib = require('../modules/encryption');
export const userRoute = Router();

// get route for all user info
userRoute.get('/', (req: Request, res: Response) => {
    console.log('in router.get');
    pool.query('SELECT * FROM "user";').then((results: any) => {
        console.log('results.data', results.rows);
        res.send(results.rows);
    }).catch((error: any) => {
        console.log('error GETing, ', error);
        res.sendStatus(500)
    });

});

interface User {
    username: string;
    password: string;
}

// register a new user
userRoute.post('/register', async (req: Request, res: Response) => {
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