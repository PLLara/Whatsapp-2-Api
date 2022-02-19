import express, { Request, Response } from "express";
import db from "../../data/postgres";
import basicValidation from "../../validators/basic";

export default (database: db) => {
  const router = express.Router();

  /* GET users listing. */
  router.get("/", async function (req: Request, res: Response) {
    let { fone } = req.body;

    
    if (!basicValidation(fone)) {
        return res.send({
          status: "failure",
          payload: req.body,
        });
      }
  

    var criador = await database.getUser(fone);
    if (criador == null) {
      return res.send({
        status: "failure",
        payload: "criador não existe",
      });
    }

    var conversasDoCriador = await database.getConversasFromUser(criador);

    return res.send({
      status: "success",
      payload: conversasDoCriador,
    });
  });

  return router;
};
