import express from 'express';
import db from '../../data/postgres';
import createUser from './createUsers';
import getAllUsers from './getAllUsers'
import createConversa from '../conversas/createConversa'
import getConversaFromUser from '../conversas/getConversaFromUser';

const router = express.Router();

export default (database: db) => {
    router.use('/createuser', createUser(database));
    router.use('/getallusers', getAllUsers(database));
    router.use('/createconversa',createConversa(database))
    router.use('/getconversafromuser',getConversaFromUser(database))

    return router
}