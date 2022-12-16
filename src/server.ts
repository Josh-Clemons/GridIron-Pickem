import express, { Request, Response, NextFunction } from "express";
import path from "path";
import { routes } from './Routes/index';
import cors from 'cors';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
const pool = require('./modules/pool');


// Middleware
const app = express();
app.use(express.json());
app.use(cors({origin: "http://http://localhost:3000", credentials: true}));
app.use(
    session({
        secret: "secretcode",
        resave: true,
        saveUninitialized: true,
    })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// importing routers
const userRouter = require('./Routes/user.router');

/* Routes */
app.use('/api/user', routes);




app.use(express.static(path.join(__dirname, "../public")));


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});