import express, { Request, Response } from "express";
const router = express.Router();

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

router.post("/", async function (req: Request, res: Response) {
  var data = new Date();
  const { path, mensagem, usuario, mediaLink } = req.body;
  if (path == undefined || mensagem == undefined || usuario == undefined) {
    return res.send("Message or path undefined ->" + JSON.stringify(req.body));
  }
  if (path == "" || mensagem == undefined || usuario == undefined) {
    return res.send("Message or path empty ->" + JSON.stringify(req.body));
  }

  if (typeof path == "string") {
    const firebaseApp = initializeApp({
      apiKey: "AIzaSyDQ48wcwgtKMgMzvSOKd1IYUGdkQ3XUe7A",
      authDomain: "clone-do-zap-99767.firebaseapp.com",
      databaseURL: "https://clone-do-zap-99767-default-rtdb.firebaseio.com",
      projectId: "clone-do-zap-99767",
      storageBucket: "clone-do-zap-99767.appspot.com",
      messagingSenderId: "912678314863",
      appId: "1:912678314863:web:12f668dc0224a7a9cbbe9a",
      measurementId: "G-LK68H06P22",
    });
    var db = getDatabase(firebaseApp);

    const parsedPath = path + "/" + Date.now().toString();

    const eita = data.toLocaleString("pt-br");
    const tempo = eita.split(" ")[1];
    const dias = eita.split(" ")[0].split("/").reverse().join("-");

    const parsedData = dias + " " + tempo;

    var response = await set(ref(db, parsedPath), {
      date: parsedData,
      mediaLink: mediaLink ?? "",
      mensagem: mensagem,
      usuario: usuario,
    });
    return res.send(response);
  } else {
    return res.send("Unspected error");
  }
});

export default router;
