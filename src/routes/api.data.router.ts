import { Router, Request, Response } from "express";
import axios from "axios";
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


export const dataRouter = Router();

dataRouter.get('/data/getresults', rejectUnauthenticated, (req: any, res: Response) => {

    pool.query('SELECT * FROM "game_data";').then((results: any) => {
        res.send(results.rows);
    }).catch((error: Error) => {
        console.log('error in GET results:', error);
        res.sendStatus(500);
    });
});

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

dataRouter.post('/data/save', rejectUnauthenticated, (req: any, res: Response) => {
    const gameData: { team: string, week: number, is_winner: boolean }[] = req.body;
    let queryText = `INSERT INTO "game_data" ("team", "week", "is_winner") VAlUES `;

    gameData.map((e) => {
        queryText = queryText + `('${e.team}', '${e.week}', '${e.is_winner}'),`;
    })

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