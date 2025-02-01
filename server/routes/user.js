import express from 'express';
import userController from '../controllers/userController.js'

const userRouter = express.Router();

// get all users in database
userRouter.get('/getUser', roomiesController.getUsers, (req, res) => {
    res.status(200).json(res.locals.users);
});

// create new User
userRouter.post('/createUser', 
    userController.createUser,(req, res) => res.status(200).json(res.locals.newUser)
);

// delete existing user
userRouter.delete('/deleteUser/:id',
    userController.deleteUser,(req, res) => res.status(200).json(res.locals.deletedUser)
);

export default userRouter;