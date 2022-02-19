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
const uuid_1 = require("uuid");
const basic_1 = __importDefault(require("../../validators/basic"));
exports.default = (database) => {
    const router = express_1.default.Router();
    /* GET users listing. */
    router.post('/', function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, fone } = req.body;
            if (!(0, basic_1.default)(nome, fone)) {
                return res.send({
                    status: 'failure',
                    payload: req.body
                });
            }
            try {
                const newUser = yield database.models.Users.create({
                    userId: (0, uuid_1.v4)(),
                    nome: nome,
                    fone: fone
                });
                return res.send({
                    status: 'success',
                    payload: newUser
                });
            }
            catch (e) {
                try {
                    if (e.errors[0].message == "fone must be unique") {
                        return res.send({
                            status: 'success',
                            payload: 'user already created'
                        });
                    }
                }
                catch (e2) {
                    return res.send({
                        status: 'failure',
                        payload: [e, e2]
                    });
                }
            }
        });
    });
    return router;
};
