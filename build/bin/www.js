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
const app_1 = __importDefault(require("../src/app"));
const http_1 = __importDefault(require("http"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const port = normalizePort(process.env.PORT || '3000');
        app_1.default.set('port', port);
        const server = http_1.default.createServer(app_1.default);
        server.listen(port);
        server.on('error', onError);
        server.on('listening', onListening);
        function normalizePort(val) {
            const port = parseInt(val, 10);
            if (isNaN(port)) {
                return val;
            }
            if (port >= 0) {
                return port;
            }
            return false;
        }
        function onError(error) {
            var _a;
            if (error.syscall !== 'listen') {
                throw error;
            }
            const bind = typeof port === 'string'
                ? 'Pipe ' + port
                : (_a = 'Port ' + port) !== null && _a !== void 0 ? _a : '';
            switch (error.code) {
                case 'EACCES':
                    console.error(bind + ' requires elevated privileges');
                    process.exit(1);
                case 'EADDRINUSE':
                    console.error(bind + ' is already in use');
                    process.exit(1);
                default:
                    throw error;
            }
        }
        function onListening() {
            var _a;
            const addr = server.address();
            const bind = typeof addr === 'string'
                ? 'pipe ' + addr
                : (_a = 'port ' + (addr === null || addr === void 0 ? void 0 : addr.port)) !== null && _a !== void 0 ? _a : '';
            console.log('Listening on ' + bind);
        }
    });
}
main();
