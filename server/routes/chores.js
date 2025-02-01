import express from 'express';
import choresController from '../controllers/choresController.js'

const choresRouter = express.Router();

choresRouter.post('/createChore', 
    choresController.createChore, (req, res) => res.status(200).json(res.locals.newChore)
)

choresRouter.put('/assignChore',
    choresController.assignChore, (req, res) => res.status(200).json(res.locals.assignedChore)
)

choresRouter.delete('/deleteChore/:id',
    choresController.deleteChore, (req, res) => res.status(200).json(res.locals.deletedChore))

choresRouter.get('/getChores',
    choresController.getChores, (req, res) => res.status(200).json(res.locals.chores))

export default choresRouter;