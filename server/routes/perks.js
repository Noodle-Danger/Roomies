import express from 'express';
import perksController from '../controllers/perksController.js'

const perksRouter = express.Router();

// Get all perks
perksRouter.get('/', perksController.getPerks, (req, res) => {
    res.status(200).json(res.locals.perks);
});

// Add new perk
perksRouter.post('/', perksController.addPerk, (req, res) => {
    res.status(200).json(res.locals.newPerk);
});

// User purchases a perk
perksRouter.patch('/', perksController.buyPerk, (req, res) => {
    res.status(200).json(res.locals.buyPerk);
});


export default perksRouter;