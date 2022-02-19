import express, { Request, Response } from "express";
import db from "../../data/postgres";


export default (database: db) => {
    const router = express.Router();

    /* GET users listing. */
    router.get('/', async function (req: Request, res: Response) {
        try {
            const allUsers = await database.getAllUsers();
            return res.send({
                status: 'success',
                payload: allUsers
            })
        } catch (e) {
            res.send({
                status: 'success',
                payload: e
            })
        }
    });
    return router;
};
