import { Router, Request, Response } from "express";
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


export const leagueRouter = Router();

// get leagues for logged in user
leagueRouter.get('/league', rejectUnauthenticated, (req: any, res: Response) => {
    const userId: number = req.user.id;
    const queryText: string = `
        SELECT "league"."id" AS "league_id", "league"."league_name" FROM "league"
        JOIN "picks" ON "picks"."league_id" = "league"."id"
        JOIN "user" ON "user"."id" = "picks"."user_id"
        WHERE "user"."id" = $1
        GROUP BY 1
        ORDER BY 1;
    `

    pool.query(queryText, [userId]).then((results: any) => {
        res.send(results.rows);
    }).catch((error: any) => {
        console.log('error in league GET, error:', error);
        res.sendStatus(500);
    })
});

// get league details for current league user is visiting
leagueRouter.get('/league/:id', rejectUnauthenticated, (req: any, res: Response) => {
    const leagueId = req.params.id;
    const queryText = `
        SELECT "user"."username", "league"."league_name", "picks"."week", "picks"."amount", "picks"."team" FROM "user"
        JOIN "picks" ON "picks"."user_id" = "user"."id"
        JOIN "league" ON "league"."id" = "picks"."league_id"
        WHERE "picks"."league_id" = $1;
    `

    pool.query(queryText, [leagueId]).then((results: any) => {
        res.send(results.rows);
    }).catch((error: any) => {
        console.log('error in league detail query', error);
        res.sendStatus(500);
    });
});


// get newest league
leagueRouter.get('/league/newest', rejectUnauthenticated, (req: any, res: Response) => {
    const userId: number = req.user.id;
    const queryText: string = `
        SELECT * FROM "league"
        WHERE "owner_id" = $1
        ORDER BY "id" DESC 
        LIMIT 1;
    `

    pool.query(queryText, [userId]).then((results:any) => {
        res.send(results.rows);
    }).catch((error: any) => {
        console.log('error in get newest league,', error);
        res.sendStatus(500);
    });
});


// create new league
leagueRouter.post('/league/create', rejectUnauthenticated, (req: any, res: Response) => {
    const queryText: string = 'INSERT INTO "league" ("league_name", "owner_id") VALUES ($1, $2);';
    const leagueName: string = Object.keys(req.body)[0]; // why does my payload string come over as an object requiring me to do this work-around?
    const commissionerId: number = req.user.id;

    pool.query(queryText, [leagueName, commissionerId]).then((results: any) => {
        res.send(results);
    }).catch((error: any) => {
        console.log('error POSTing new league', error);
        res.sendStatus(500);
    });
});