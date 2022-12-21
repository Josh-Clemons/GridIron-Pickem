import express from 'express';
import { userRouter } from './user.router';
import { leagueRouter } from './league.router';
import { pickRouter } from './pick.router';

export const routes = express.Router();

routes.use(
    userRouter,
    leagueRouter,
    pickRouter
);