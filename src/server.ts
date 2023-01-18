import express from "express";
import path from "path";
import { routes } from './Routes/index.js';
import cors from 'cors';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
const bodyParser = require('body-parser');


// Middleware
const app = express();
app.use(express.json());
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(
    session({
        secret: "secretcode",
        resave: true,
        saveUninitialized: true,
    })
);
app.use(cookieParser());
// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// start passport up
app.use(passport.initialize());
app.use(passport.session());


/* Routes */
app.use('/api', routes);



app.use(express.static(path.join(__dirname, "../public")));


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});