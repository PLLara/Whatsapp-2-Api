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
const basic_1 = __importDefault(require("../../validators/basic"));
exports.default = (database) => {
    const router = express_1.default.Router();
    /* GET users listing. */
    router.get("/", function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { fone } = req.body;
            if (!(0, basic_1.default)(fone)) {
                return res.send({
                    status: "failure",
                    payload: req.body,
                });
            }
            var criador = yield database.getUser(fone);
            if (criador == null) {
                return res.send({
                    status: "failure",
                    payload: "criador não existe",
                });
            }
            var conversasDoCriador = yield database.getConversasFromUser(criador);
            return res.send({
                status: "success",
                payload: conversasDoCriador,
            });
        });
    });
    return router;
};
