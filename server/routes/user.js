import express from 'express';
import userController from '../controllers/userController.js'

const userRouter = express.Router();

// Get all users
userRouter.get('/', userController.getUsers, (req, res) => {
    res.status(200).json(res.locals.users);
});

// Create new user
userRouter.post('/', userController.createUser,(req, res) => {
    res.status(200).json(res.locals.newUser);
});

// Delete existing user
userRouter.delete('/:id', userController.deleteUser,(req, res) => {
    res.status(200).json(res.locals.deletedUser);
});


export default userRouter;