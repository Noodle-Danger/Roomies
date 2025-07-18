import express from 'express';
import choresController from '../controllers/choresController.js'

const choresRouter = express.Router();

// Get all chores
choresRouter.get('/', choresController.getChores, (req, res) => {
    res.status(200).json(res.locals.chores);
});

// Get completed chores
choresRouter.get('/completed/:user_id', choresController.getCompletedChores, (req, res) => {
    if (res.locals.completeChores.length > 0) {
        res.status(200).json(res.locals.completeChores);
    } else {
        res.status(200).json([]);
    }
});

// Create a chore
choresRouter.post('/', choresController.createChore, (req, res) => {
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