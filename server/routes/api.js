import express from 'express';
import choresRouter from './chores.js';
import userRouter from './user.js';
import userPerksRouter from './userPerks.js';
import perksRouter from './perks.js';

const apiRouter = express.Router();

apiRouter.use('/chores', choresRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/userPerks', userPerksRouter);
apiRouter.use('/perks', perksRouter);

export default apiRouter;