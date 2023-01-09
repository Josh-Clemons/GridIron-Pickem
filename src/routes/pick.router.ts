import { Router, Request, Response } from "express";
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


export const pickRouter = Router();


// creates all picks for a user when they join the league

pickRouter.post('/pick/create/:id', rejectUnauthenticated, (req: any, res: Response) => {
    const leagueId: number = req.params.id;
    const userId: number = req.user.id;

    const queryText = `
        INSERT INTO "picks" ("user_id", "league_id", "week", "amount")
            VALUES 
                ($1, $2, 1, 5),
                ($1, $2, 1, 3),
                ($1, $2, 1, 1),
                ($1, $2, 2, 5),
                ($1, $2, 2, 3),
                ($1, $2, 2, 1),
                ($1, $2, 3, 5),
                ($1, $2, 3, 3),
                ($1, $2, 3, 1),
                ($1, $2, 4, 5),
                ($1, $2, 4, 3),
                ($1, $2, 4, 1),
                ($1, $2, 5, 5),
                ($1, $2, 5, 3),
                ($1, $2, 5, 1),
                ($1, $2, 6, 5),
                ($1, $2, 6, 3),
                ($1, $2, 6, 1),
                ($1, $2, 7, 5),
                ($1, $2, 7, 3),
                ($1, $2, 7, 1),
                ($1, $2, 8, 5),
                ($1, $2, 8, 3),
                ($1, $2, 8, 1),
                ($1, $2, 9, 5),
                ($1, $2, 9, 3),
                ($1, $2, 9, 1),
                ($1, $2, 10, 5),
                ($1, $2, 10, 3),
                ($1, $2, 10, 1),
                ($1, $2, 11, 5),
                ($1, $2, 11, 3),
                ($1, $2, 11, 1),
                ($1, $2, 12, 5),
                ($1, $2, 12, 3),
                ($1, $2, 12, 1),
                ($1, $2, 13, 5),
                ($1, $2, 13, 3),
                ($1, $2, 13, 1),
                ($1, $2, 14, 5),
                ($1, $2, 14, 3),
                ($1, $2, 14, 1),
                ($1, $2, 15, 5),
                ($1, $2, 15, 3),
                ($1, $2, 15, 1),
                ($1, $2, 16, 5),
                ($1, $2, 16, 3),
                ($1, $2, 16, 1),
                ($1, $2, 17, 5),
                ($1, $2, 17, 3),
                ($1, $2, 17, 1),
                ($1, $2, 18, 5),
                ($1, $2, 18, 3),
                ($1, $2, 18, 1);
    `;

    pool.query(queryText, [userId, leagueId]).then(() => {
        res.sendStatus(201);
    }).catch((error: any) => {
        console.log('error POSTing new league', error);
    });
});



// updates a users picks, first removes old ones, then posts new ones.
pickRouter.put('/pick/update/:leagueId', rejectUnauthenticated, (req: any, res: Response) => {
    const leagueId: number = req.params.leagueId;
    console.log('req.body in pick update:', req.body)
    const userId: number = req.body.userId;
    const picks: { week: number, team: string, amount: number }[] = req.body.picks;
    const queryDeleteText: string = `DELETE FROM "picks" WHERE "league_id" = $1 AND "user_id" = $2;`;

    const queryAddText: string = `
        INSERT INTO "picks" ("user_id", "league_id", "week", "team", "amount")
        VALUES
            ($1, $2, $3, $4, $5),
            ($1, $2, $6, $7, $8),
            ($1, $2, $9, $10, $11),
            ($1, $2, $12, $13, $14),
            ($1, $2, $15, $16, $17),
            ($1, $2, $18, $19, $20),
            ($1, $2, $21, $22, $23),
            ($1, $2, $24, $25, $26),
            ($1, $2, $27, $28, $29),
            ($1, $2, $30, $31, $32),
            ($1, $2, $33, $34, $35),
            ($1, $2, $36, $37, $38),
            ($1, $2, $39, $40, $41),
            ($1, $2, $42, $43, $44),
            ($1, $2, $45, $46, $47),
            ($1, $2, $48, $49, $50),
            ($1, $2, $51, $52, $53),
            ($1, $2, $54, $55, $56),
            ($1, $2, $57, $58, $59),
            ($1, $2, $60, $61, $62),
            ($1, $2, $63, $64, $65),
            ($1, $2, $66, $67, $68),
            ($1, $2, $69, $70, $71),
            ($1, $2, $72, $73, $74),
            ($1, $2, $75, $76, $77),
            ($1, $2, $78, $79, $80),
            ($1, $2, $81, $82, $83),
            ($1, $2, $84, $85, $86),
            ($1, $2, $87, $88, $89),
            ($1, $2, $90, $91, $92),
            ($1, $2, $93, $94, $95),
            ($1, $2, $96, $97, $98),
            ($1, $2, $99, $100, $101),
            ($1, $2, $102, $103, $104),
            ($1, $2, $105, $106, $107),
            ($1, $2, $108, $109, $110),
            ($1, $2, $111, $112, $113),
            ($1, $2, $114, $115, $116),
            ($1, $2, $117, $118, $119),
            ($1, $2, $120, $121, $122),
            ($1, $2, $123, $124, $125),
            ($1, $2, $126, $127, $128),
            ($1, $2, $129, $130, $131),
            ($1, $2, $132, $133, $134),
            ($1, $2, $135, $136, $137),
            ($1, $2, $138, $139, $140),
            ($1, $2, $141, $142, $143),
            ($1, $2, $144, $145, $146),
            ($1, $2, $147, $148, $149),
            ($1, $2, $150, $151, $152),
            ($1, $2, $153, $154, $155),
            ($1, $2, $156, $157, $158),
            ($1, $2, $159, $160, $161),
            ($1, $2, $162, $163, $164);
    `

    const queryAddParams = [
        userId, leagueId,
        picks[0].week, picks[0].team, picks[0].amount,
        picks[1].week, picks[1].team, picks[1].amount,
        picks[2].week, picks[2].team, picks[2].amount,
        picks[3].week, picks[3].team, picks[3].amount,
        picks[4].week, picks[4].team, picks[4].amount,
        picks[5].week, picks[5].team, picks[5].amount,
        picks[6].week, picks[6].team, picks[6].amount,
        picks[7].week, picks[7].team, picks[7].amount,
        picks[8].week, picks[8].team, picks[8].amount,
        picks[9].week, picks[9].team, picks[9].amount,
        picks[10].week, picks[10].team, picks[10].amount,
        picks[11].week, picks[11].team, picks[11].amount,
        picks[12].week, picks[12].team, picks[12].amount,
        picks[13].week, picks[13].team, picks[13].amount,
        picks[14].week, picks[14].team, picks[14].amount,
        picks[15].week, picks[15].team, picks[15].amount,
        picks[16].week, picks[16].team, picks[16].amount,
        picks[17].week, picks[17].team, picks[17].amount,
        picks[18].week, picks[18].team, picks[18].amount,
        picks[19].week, picks[19].team, picks[19].amount,
        picks[20].week, picks[20].team, picks[20].amount,
        picks[21].week, picks[21].team, picks[21].amount,
        picks[22].week, picks[22].team, picks[22].amount,
        picks[23].week, picks[23].team, picks[23].amount,
        picks[24].week, picks[24].team, picks[24].amount,
        picks[25].week, picks[25].team, picks[25].amount,
        picks[26].week, picks[26].team, picks[26].amount,
        picks[27].week, picks[27].team, picks[27].amount,
        picks[28].week, picks[28].team, picks[28].amount,
        picks[29].week, picks[29].team, picks[29].amount,
        picks[30].week, picks[30].team, picks[30].amount,
        picks[31].week, picks[31].team, picks[31].amount,
        picks[32].week, picks[32].team, picks[32].amount,
        picks[33].week, picks[33].team, picks[33].amount,
        picks[34].week, picks[34].team, picks[34].amount,
        picks[35].week, picks[35].team, picks[35].amount,
        picks[36].week, picks[36].team, picks[36].amount,
        picks[37].week, picks[37].team, picks[37].amount,
        picks[38].week, picks[38].team, picks[38].amount,
        picks[39].week, picks[39].team, picks[39].amount,
        picks[40].week, picks[40].team, picks[40].amount,
        picks[41].week, picks[41].team, picks[41].amount,
        picks[42].week, picks[42].team, picks[42].amount,
        picks[43].week, picks[43].team, picks[43].amount,
        picks[44].week, picks[44].team, picks[44].amount,
        picks[45].week, picks[45].team, picks[45].amount,
        picks[46].week, picks[46].team, picks[46].amount,
        picks[47].week, picks[47].team, picks[47].amount,
        picks[48].week, picks[48].team, picks[48].amount,
        picks[49].week, picks[49].team, picks[49].amount,
        picks[50].week, picks[50].team, picks[50].amount,
        picks[51].week, picks[51].team, picks[51].amount,
        picks[52].week, picks[52].team, picks[52].amount,
        picks[53].week, picks[53].team, picks[53].amount
    ]

    pool.query(queryDeleteText, [leagueId, userId]).then(() => {

        pool.query(queryAddText, queryAddParams).then(() => {
            res.sendStatus(200);
        }).catch((error: Error) => {
            console.log('error in updatePicks add query', error);
            res.sendStatus(500);
        })
    }).catch((error:Error) => {
        console.log('error in updatePicks delete query', error);
        res.sendStatus(500)
    });

});
