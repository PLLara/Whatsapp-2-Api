/* eslint-disable @typescript-eslint/no-explicit-any */
import createError from 'http-errors';
import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index';
import sendMessageRouter from './routes/send_message';

import cors from 'cors'
import request from 'request';
import db from './data/postgres';

const app = express();
const database = new db();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// middlewares setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

// routes
app.use('/', indexRouter);

import usersRouter from './routes/users/index'
app.use('/',usersRouter(database));


app.use('/sendMessage', sendMessageRouter)

// proxys
app.use('/proxy', function (req, res) {
  const { url } = req.query;
  if (url === '') {
    return res.send('no url provided');
  }

  return (req.pipe(request.get(url as string))).pipe(res);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err: any, req: Request, res: Response, _next: NextFunction): void {

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
