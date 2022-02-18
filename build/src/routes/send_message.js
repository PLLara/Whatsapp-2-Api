"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const app_1 = require("firebase/app");
const database_1 = require("firebase/database");
router.post('/', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var data = new Date();
        const { path, mensagem, usuario, mediaLink } = req.body;
        if (path == undefined || mensagem == undefined || usuario == undefined) {
            return res.send('Message or path undefined ->' + JSON.stringify(req.body));
        }
        if (path == '' || mensagem == undefined || usuario == undefined) {
            return res.send("Message or path empty ->" + JSON.stringify(req.body));
        }
        if (typeof path == 'string') {
            const firebaseApp = (0, app_1.initializeApp)({
                apiKey: "AIzaSyBGk-UQzUi87TkW-EPv75PXmXiZ_2n2ONU",
                authDomain: "whatsappi-2.firebaseapp.com",
                databaseURL: "https://whatsappi-2-default-rtdb.firebaseio.com",
                projectId: "whatsappi-2",
                storageBucket: "whatsappi-2.appspot.com",
                messagingSenderId: "1005267707114",
                appId: "1:1005267707114:web:991ad2d96cbe856a6d2393",
                measurementId: "G-9VR129Y8JL"
            });
            var db = (0, database_1.getDatabase)(firebaseApp);
            const parsedPath = path + '/' + Date.now().toString();
            const eita = data.toLocaleString('pt-br');
            const tempo = eita.split(' ')[1];
            const dias = eita.split(' ')[0].split('/').reverse().join('-');
            const parsedData = dias + " " + tempo;
            var response = yield (0, database_1.set)((0, database_1.ref)(db, parsedPath), {
                date: parsedData,
                mediaLink: mediaLink !== null && mediaLink !== void 0 ? mediaLink : '',
                mensagem: mensagem,
                usuario: usuario
            });
            return res.send(response);
        }
        else {
            return res.send("Unspected error");
        }
    });
});
exports.default = router;
