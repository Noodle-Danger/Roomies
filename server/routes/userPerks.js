import express from 'express';
import userPerksController from '../controllers/userPerksController.js'

const userPerksRouter = express.Router();

// Get all perks
userPerksRouter.get('/', userPerksController.getPerks, (req, res) => {
    res.status(200).json(res.locals.allPerks);
});

// // Add new perk
// userPerksRouter.post('/', userPerksController.addPerk, (req, res) => {
//     res.status(200).json(res.locals.newPerk);
// });

// // User purchases a perk
// userPerksRouter.patch('/', userPerksController.buyPerk, (req, res) => {
//     res.status(200).json(res.locals.buyPerk);
// });


export default userPerksRouter;