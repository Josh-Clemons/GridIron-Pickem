import { Router, Request, Response, NextFunction } from "express";
import axios from "axios";
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


export const dataRouter = Router();

dataRouter.get('/data/update/:week', rejectUnauthenticated, (req: any, res: Response) => {
    const week = req.params.week;

    axios.get('https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=' + week )
        .then((results: any) => {
            res.send(results.data)
        }).catch((error: Error) => {
            console.log('error GETing espn data in dataRouter:', error);
            res.sendStatus(500);
        });

});

dataRouter.post('/data/save', rejectUnauthenticated, (req: any, res: Response) => {
    const gameData: {team: string, week: number, is_winner: boolean }[] = req.body;
    let queryText = `INSERT INTO "game_data" ("team", "week", "is_winner") VAlUES `;

    gameData.map((e) => {
        queryText = queryText + `('${e.team}', '${e.week}', '${e.is_winner}'),`;
    })
    
    queryText = queryText.slice(0, -1); 
    queryText += ';';

    // console.log('queryText: ', queryText);
    // res.sendStatus(200);
    pool.query(queryText).then(() => res.sendStatus(201)).catch((error:Error) => {
        console.log('error in POSTing game data to DB:', error)
        res.sendStatus(500)
    });
})