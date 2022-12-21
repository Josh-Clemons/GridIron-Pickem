import { Router, Request, Response } from "express";
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


export const pickRouter = Router();


// creates all picks for a user when they join the league

pickRouter.post('/pick/create/:id', rejectUnauthenticated, (req: any, res: Response) => {
    const leagueId: number = req.params.id;
    const userId: number = req.user.id;

    const queryText = `
        INSERT INTO "picks" ("user_id", "league_id", "week", "amount")
            VALUES 
                ($1, $2, 1, 5),
                ($1, $2, 1, 3),
                ($1, $2, 1, 1),
                ($1, $2, 2, 5),
                ($1, $2, 2, 3),
                ($1, $2, 2, 1),
                ($1, $2, 3, 5),
                ($1, $2, 3, 3),
                ($1, $2, 3, 1),
                ($1, $2, 4, 5),
                ($1, $2, 4, 3),
                ($1, $2, 4, 1),
                ($1, $2, 5, 5),
                ($1, $2, 5, 3),
                ($1, $2, 5, 1),
                ($1, $2, 6, 5),
                ($1, $2, 6, 3),
                ($1, $2, 6, 1),
                ($1, $2, 7, 5),
                ($1, $2, 7, 3),
                ($1, $2, 7, 1),
                ($1, $2, 8, 5),
                ($1, $2, 8, 3),
                ($1, $2, 8, 1),
                ($1, $2, 9, 5),
                ($1, $2, 9, 3),
                ($1, $2, 9, 1),
                ($1, $2, 10, 5),
                ($1, $2, 10, 3),
                ($1, $2, 10, 1),
                ($1, $2, 11, 5),
                ($1, $2, 11, 3),
                ($1, $2, 11, 1),
                ($1, $2, 12, 5),
                ($1, $2, 12, 3),
                ($1, $2, 12, 1),
                ($1, $2, 13, 5),
                ($1, $2, 13, 3),
                ($1, $2, 13, 1),
                ($1, $2, 14, 5),
                ($1, $2, 14, 3),
                ($1, $2, 14, 1),
                ($1, $2, 15, 5),
                ($1, $2, 15, 3),
                ($1, $2, 15, 1),
                ($1, $2, 16, 5),
                ($1, $2, 16, 3),
                ($1, $2, 16, 1),
                ($1, $2, 17, 5),
                ($1, $2, 17, 3),
                ($1, $2, 17, 1),
                ($1, $2, 18, 5),
                ($1, $2, 18, 3),
                ($1, $2, 18, 1);
    `;





    pool.query(queryText, [userId, leagueId]).then(() => {
        res.sendStatus(201);
    }).catch((error: any) => {
        console.log('error POSTing new league', error);
    });
});