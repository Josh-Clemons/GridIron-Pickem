import express from 'express';
import { userRouter } from './user.router';
import { leagueRouter } from '../../dist/Routes/league.router';
import { pickRouter } from './pick.router';
import { dataRouter } from '../../dist/Routes/api.data.router';
import { emailRouter } from './email.router';

export const routes = express.Router();

routes.use(
    userRouter,
    leagueRouter,
    pickRouter,
    dataRouter,
    emailRouter
);