import express, { Router } from "express";
const pool = require('../modules/pool');
export const userRoute = Router();

// get route for all user info
userRoute.get('/', (req: express.Request, res: express.Response) =>{
    console.log('in router.get');
    pool.query('SELECT * FROM "user";').then((results:any) => {
        console.log('results.data', results.rows);
        res.send(results.rows);
    }).catch((error:any) => {
        console.log('error GETing, ', error);
        res.sendStatus(500)
    });
});

