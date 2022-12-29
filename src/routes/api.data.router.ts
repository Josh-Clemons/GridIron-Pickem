import { Router, Request, Response } from "express";
import axios from "axios";
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


export const dataRouter = Router();

// gets game results from DB for use in calculating scores
dataRouter.get('/data/getresults', rejectUnauthenticated, (req: any, res: Response) => {

    pool.query('SELECT * FROM "game_data";').then((results: any) => {
        res.send(results.rows);
    }).catch((error: Error) => {
        console.log('error in GET results:', error);
        res.sendStatus(500);
    });
});

// API to ESPN to get game data (by week)
dataRouter.get('/data/update/:week', rejectUnauthenticated, (req: any, res: Response) => {
    const week = req.params.week;

    axios.get('https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=' + week)
        .then((results: any) => {
            res.send(results.data)
        }).catch((error: Error) => {
            console.log('error GETing espn data in dataRouter:', error);
            res.sendStatus(500);
        });

});

// updates game data, first builds a giant query by mapping the game data, then deletes old stuff, and finally writes new info.
dataRouter.post('/data/save', rejectUnauthenticated, (req: any, res: Response) => {
    const gameData: { team: string, week: number, is_winner: boolean }[] = req.body;
    let queryText = `INSERT INTO "game_data" ("team", "week", "is_winner") VAlUES `;

    gameData.map((e) => {
        queryText = queryText + `('${e.team}', '${e.week}', '${e.is_winner}'),`;
    })

    // removes the last comma and adds a semi-colon after building queryText
    queryText = queryText.slice(0, -1);
    queryText += ';';

    pool.query('DELETE FROM "game_data";').then(() => {
        pool.query(queryText).then(() => res.sendStatus(201)).catch((error: Error) => {
            console.log('error in POSTing game data to DB:', error)
            res.sendStatus(500)
        });
    }).catch((error: Error) => {
        console.log('error DELETEing from game_data', error);
    });
});