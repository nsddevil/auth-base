import 'dotenv/config';
import express from 'express';
import type { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import passportConfig from './passport/config';
import cookieParser from 'cookie-parser';
import apiRouter from './routes';

const app = express();

app.use(cookieParser(process.env.NODE_SNS_COOKIE_SECRET));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

passportConfig();
app.use(passport.initialize());

app.use('/api', apiRouter);

app.use((req, res, next) => {
  res.status(404);
  next(new Error(`${req.method} ${req.path} not route`));
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(res.statusCode || 500).json({ ok: false, message: err.message });
});

app.listen(process.env.NODE_SNS_PORT, () => {
  console.log(`server start port: ${process.env.NODE_SNS_PORT}`);
});
