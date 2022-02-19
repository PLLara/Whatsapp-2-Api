import express, { Request, Response } from "express";
import db from "../../data/postgres";
import { v4 as uuidv4 } from 'uuid';
import basicValidation from "../../validators/basic";



export default (database: db) => {
  const router = express.Router();

  /* GET users listing. */
  router.post('/', async function (req: Request, res: Response) {
    const { nome, fone } = req.body;

    if (!basicValidation(nome, fone)) {
      return res.send({
        status: 'failure',
        payload: req.body
      });
    }

    try {
      const newUser = await database.models.Users.create({
        userId: uuidv4(),
        nome: nome,
        fone: fone
      })
      return res.send({
        status: 'success',
        payload: newUser
      });
    } catch (e: any) {
      try {
        if (e.errors[0].message == "fone must be unique") {
          return res.send({
            status: 'success',
            payload: 'user already created'
          })
        }
      } catch (e2) {
        return res.send({
          status: 'failure',
          payload: [e, e2]
        })
      }
    }
  });

  return router;
};
