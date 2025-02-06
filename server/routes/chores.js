import express from 'express';
import choresController from '../controllers/choresController.js'

const choresRouter = express.Router();

// Get all chores
choresRouter.post('/get', choresController.getChores, (req, res) => {
    res.status(200).json(res.locals.chores);
});

// Create a chore
choresRouter.post('/create', choresController.createChore, (req, res) => {
    res.status(200).json(res.locals.newChore);
});

// UPDATE: Complete a chore
choresRouter.put('/', choresController.completeChore, (req, res) => {
    res.status(200).json(res.locals.completeChore);
});

// Delete a chore
// choresRouter.delete('/:id', choresController.deleteChore, (req, res) => {
//     res.status(200).json(res.locals.deletedChore)
// });


export default choresRouter;