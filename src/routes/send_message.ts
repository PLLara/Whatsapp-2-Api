import express, { Request, Response } from 'express';
const router = express.Router();

import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set } from "firebase/database";
import { cachedDataVersionTag } from 'v8';



router.get('/', async function (req: Request, res: Response) {
    var data = new Date();
    const { route, mensagem, usuario, mediaLink } = req.query;
    if (route == undefined || mensagem == undefined || usuario == undefined) {
        return res.send('Message or route undefined' + JSON.stringify(req.query));
    }
    if (route == '' || mensagem == undefined || usuario == undefined) {
        return res.send("Message or route empty" + JSON.stringify(req.query));
    }


    if (typeof route == 'string') {
        const firebaseApp = initializeApp({
            apiKey: "AIzaSyBGk-UQzUi87TkW-EPv75PXmXiZ_2n2ONU",
            authDomain: "whatsappi-2.firebaseapp.com",
            databaseURL: "https://whatsappi-2-default-rtdb.firebaseio.com",
            projectId: "whatsappi-2",
            storageBucket: "whatsappi-2.appspot.com",
            messagingSenderId: "1005267707114",
            appId: "1:1005267707114:web:991ad2d96cbe856a6d2393",
            measurementId: "G-9VR129Y8JL"
        });
        var db = getDatabase(firebaseApp);

        const path = route + '/' + Date.now().toString();

        const eita = data.toLocaleString('pt-br');
        const tempo = eita.split(' ')[1]
        const dias = eita.split(' ')[0].split('/').reverse().join('-')

        const parsedData = dias + " " + tempo



        var response = await set(ref(db, path), {
            date: parsedData,
            mediaLink: mediaLink ?? '',
            mensagem: mensagem,
            usuario: "+" + usuario
        });

        return res.send(response);
    } else {
        return res.send("Unspected error")
    }

});

export default router;
