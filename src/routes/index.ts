import express from 'express';
import passport from 'passport';
import authRouter from './auth';
import postsRouter from './posts';

const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/posts', passport.authenticate('jwt', { session: false }), postsRouter);
export default apiRouter;
