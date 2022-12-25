import express from 'express';
import { userRouter } from './user.router';
import { leagueRouter } from './league.router';
import { pickRouter } from './pick.router';
import { dataRouter } from './api.data.router';

export const routes = express.Router();

routes.use(
    userRouter,
    leagueRouter,
    pickRouter,
    dataRouter
);