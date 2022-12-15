import express, { Request, Response, NextFunction } from "express";
import path from "path";
import { routes } from './Routes/index'
const pool = require('./modules/pool');


const app = express();

// importing routers
const userRouter = require('./Routes/user.router');

/* Routes */
app.use('/api/users', routes);

app.use(express.static(path.join(__dirname, "../public")));


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});