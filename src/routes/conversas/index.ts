import express from 'express';
import db from '../../data/postgres';
import createConversa from './createConversa';
import getConversaFromUser from './getConversaFromUser';

const router = express.Router();

export default (database: db) => {
    router.use('/createconversa',createConversa(database))
    router.use('/getconversafromuser',getConversaFromUser(database))

    return router
}