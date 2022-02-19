import express, { Request, Response } from "express";
import db from "../../data/postgres";
import { v4 as uuidv4 } from "uuid";
import basicValidation from "../../validators/basic";
import unecessaryValidation from "../../validators/unecessary";

export default (database: db) => {
  const router = express.Router();

  /* GET users listing. */
  router.post("/", async function (req: Request, res: Response) {
    let { titulo, descricao, criadorFone, thumb } = req.body;

    thumb = unecessaryValidation(thumb);

    if (!basicValidation(titulo, descricao, criadorFone)) {
      return res.send({
        status: "failure",
        payload: req.body,
      });
    }


    var criador = await database.getUser(criadorFone);
    if (criador == null) {
      return res.send({
        status: "failure",
        payload: "criador não existe",
      });
    }

    await database.createConversa(titulo, descricao, criador, thumb);

    var conversasDoCriador = await database.getConversasFromUser(criador);

    return res.send({
      status: "success",
      payload: conversasDoCriador,
    });
  });

  return router;
};
