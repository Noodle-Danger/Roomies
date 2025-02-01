import express from 'express';
import choresRouter from './chores.js';
import userRouter from './user.js';

const apiRouter = express.Router();

apiRouter.use('/chores', choresRouter);
apiRouter.use('/users', userRouter);

export default apiRouter;