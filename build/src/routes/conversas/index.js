"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createConversa_1 = __importDefault(require("./createConversa"));
const getConversaFromUser_1 = __importDefault(require("./getConversaFromUser"));
const router = express_1.default.Router();
exports.default = (database) => {
    router.use('/createconversa', (0, createConversa_1.default)(database));
    router.use('/getconversafromuser', (0, getConversaFromUser_1.default)(database));
    return router;
};
