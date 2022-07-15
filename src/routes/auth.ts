import express from 'express';
import passport from 'passport';
import { register, login, logout } from '../controller/authCtrl';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', passport.authenticate('local', { session: false }), login);

authRouter.get('/logout', passport.authenticate('jwt', { session: false }), logout);

export default authRouter;
