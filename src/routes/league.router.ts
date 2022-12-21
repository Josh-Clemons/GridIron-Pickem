import { Router, Request, Response } from "express";
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


export const leagueRouter = Router();


// create new league
leagueRouter.post('/league/create', rejectUnauthenticated, (req: any, res: Response) => {
    const queryText: string = 'INSERT INTO "league" ("league_name", "owner_id") VALUES ($1, $2);';
    const leagueName: string =  Object.keys(req.body)[0];
    const commissionerId: number = req.user.id;

    pool.query(queryText, [leagueName, commissionerId]).then((results) => {
        res.sendStatus(201);
    }).catch(error => {
        console.log('error POSTing new league', error);
    });
});