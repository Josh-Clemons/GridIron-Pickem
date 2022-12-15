import express, { Request, Response, NextFunction } from "express";
import path from "path";
import pool from "./Modules/pool";

const app = express();
const router = express.Router();

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req: Request, res: Response, next: NextFunction): void => {
    try {
        res.send("index.html");
    } catch (error) {
        next(error);
    }
});

app.get('/users', (req: express.Request, res: express.Response) =>{
    console.log('in router.get');
    pool.query('SELECT * FROM "user";').then((results:any) => {
        console.log('results.data', results.rows);
        res.send(results.rows);
    }).catch((error:any) => {
        console.log('error GETing, ', error);
        res.sendStatus(500)
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});