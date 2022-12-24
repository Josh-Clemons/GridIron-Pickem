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