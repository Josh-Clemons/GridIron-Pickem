import express from 'express';
import { userRouter } from './user.router';

export const routes = express.Router();

routes.use(
    userRouter
);