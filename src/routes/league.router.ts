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
    }).catch((error: Error) => {
        console.log('error in league GET, error:', error);
        res.sendStatus(500);
    })
});

// find available leagues for user to join
leagueRouter.get('/league/available', rejectUnauthenticated, (req: any, res: Response) => {
    const userId: number = req.user.id;
    const queryText: string = `
        SELECT "league"."id", "league"."league_name", json_agg(DISTINCT "picks"."user_id") AS "user_array" FROM "league"
        JOIN "picks" ON "picks"."league_id" = "league"."id"
        WHERE "league"."is_private" = false
        GROUP BY 1;
    `

    pool.query(queryText).then((results: any) => {
        res.send(results.rows);
    }).catch((error: Error) => {
        console.log('error in getting available leagues, ', error)
        res.sendStatus(500);
    });
});

// get league details for current league user is visiting
leagueRouter.get('/league/detail/:id', rejectUnauthenticated, (req: any, res: Response) => {
    const leagueId = req.params.id;
    const queryText = `
        SELECT "league"."id" AS "league_id", "user"."username", "league"."league_name", "picks"."week", "picks"."amount", "picks"."team", "league"."owner_id" FROM "user"
        JOIN "picks" ON "picks"."user_id" = "user"."id"
        JOIN "league" ON "league"."id" = "picks"."league_id"
        WHERE "picks"."league_id" = $1;
    `

    pool.query(queryText, [leagueId]).then((results: any) => {
        res.send(results.rows);
    }).catch((error: Error) => {
        console.log('error in league detail query', error);
        res.sendStatus(500);
    });
});

// get the user list for the current league
leagueRouter.get('/league/users/:id', rejectUnauthenticated, (req: any, res: Response) => {
    const leagueId = req.params.id;
    const queryText: string = `
        SELECT "user"."id", "user"."username" FROM "user"
        JOIN "picks" ON "picks"."user_id"= "user"."id"
        WHERE "picks"."league_id" = $1
        GROUP BY 1;
    `

    pool.query(queryText, [leagueId]).then((results: any) => {
        res.send(results.rows)
    }).catch((error: Error) => {
        console.log('error in get league users', error);
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
    pool.query(queryText, [userId]).then((results: any) => {
        res.send(results.rows);
    }).catch((error: Error) => {
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
        res.sendStatus(201);
    }).catch((error: Error) => {
        console.log('error POSTing new league', error);
        res.sendStatus(500);
    });
});


// delete league
leagueRouter.delete('/league/delete/:id', rejectUnauthenticated, (req: any, res: Response) => {
    const queryText: string = `DELETE FROM "picks" WHERE "league_id" = $1;`;
    const leagueId: number = req.params.id;

    pool.query(queryText, [leagueId]).then(() => {
        pool.query('DELETE FROM "league" WHERE "id"=$1', [leagueId]).then(() => {
            res.sendStatus(200);
        }).catch((error: Error) => {
            console.log('error deleting from league table', error);
        });
    }).catch((error: Error) => {
        console.log('error deleting league from picks table,', error);
    });
});

// leaves a league
leagueRouter.delete('/league/leave/:leagueId', rejectUnauthenticated, (req: any, res: Response) => {
    const leagueId:number = req.params.leagueId;
    const userId: number = req.user.id;
    const queryText: string = `DELETE FROM "picks" WHERE "league_id" = $1 AND "user_id" = $2;`;

    pool.query(queryText, [leagueId, userId]).then(() => {
        res.sendStatus(200);
    }).catch((error: Error) => {
        console.log('error deleting user from league:', error);
    });
});


// update league name
leagueRouter.put('/league/rename', rejectUnauthenticated, (req: any, res: Response) => {
    const userId: number = req.user.id;
    const leagueId: number = req.body.id;
    const leagueName: string = req.body.name;
    const queryText: string = `UPDATE "league" SET "league_name" = $1 WHERE "id" = $2 AND "owner_id" = $3;`

    pool.query(queryText, [leagueName, leagueId, userId]).then(() => {
        res.sendStatus(200);
    }).catch((error: Error) => {
        console.log('error in query to rename league:', error);
    });
});
