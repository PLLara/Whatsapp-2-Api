import express, { Request, Response } from "express";

const router = express.Router();

/* GET users listing. */
router.get('/', function (_req: Request, res: Response) {

  return res.send('respond with a resource');
});

export default router;
