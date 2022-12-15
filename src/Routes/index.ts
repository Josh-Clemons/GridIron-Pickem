import express from 'express';
import { userRoute } from './user.router';

export const routes = express.Router();

routes.use(
    userRoute
);