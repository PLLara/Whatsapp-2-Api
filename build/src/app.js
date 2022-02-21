"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const index_1 = __importDefault(require("./routes/index"));
const send_message_1 = __importDefault(require("./routes/send_message"));
const cors_1 = __importDefault(require("cors"));
const request_1 = __importDefault(require("request"));
const postgres_1 = __importDefault(require("./data/postgres"));
const app = (0, express_1.default)();
const database = new postgres_1.default();
// view engine setup
app.set('views', path_1.default.join(__dirname, '../views'));
app.set('view engine', 'ejs');
// middlewares setup
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use((0, cors_1.default)());
// routes
app.use('/', index_1.default);
// manipulate users
const index_2 = __importDefault(require("./routes/users/index"));
app.use('/', (0, index_2.default)(database));
// manipulate conversas
const index_3 = __importDefault(require("./routes/conversas/index"));
app.use('/', (0, index_3.default)(database));
// send messages
app.use('/sendMessage', send_message_1.default);
// proxys
app.use('/proxy', function (req, res) {
    const { url } = req.query;
    if (url === '') {
        return res.send('no url provided');
    }
    return (req.pipe(request_1.default.get(url))).pipe(res);
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res, _next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
exports.default = app;
