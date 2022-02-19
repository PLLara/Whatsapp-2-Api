"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createUsers_1 = __importDefault(require("./createUsers"));
const getAllUsers_1 = __importDefault(require("./getAllUsers"));
const createConversa_1 = __importDefault(require("../conversas/createConversa"));
const getConversaFromUser_1 = __importDefault(require("../conversas/getConversaFromUser"));
const router = express_1.default.Router();
exports.default = (database) => {
    router.use('/createuser', (0, createUsers_1.default)(database));
    router.use('/getallusers', (0, getAllUsers_1.default)(database));
    router.use('/createconversa', (0, createConversa_1.default)(database));
    router.use('/getconversafromuser', (0, getConversaFromUser_1.default)(database));
    return router;
};
