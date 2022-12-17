import express from "express";

const rejectUnauthenticated = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // check if logged in
    if (req.isAuthenticated()) {
        // They were authenticated! User may do the next thing
        next();
    } else {
        // failure best handled on the server. do redirect here.
        res.sendStatus(403);
    }
};

module.exports = { rejectUnauthenticated };
