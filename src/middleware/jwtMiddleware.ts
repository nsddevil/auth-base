import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import type { Request, Response, NextFunction } from 'express';
import { dbClient } from '../db';
import { errorMessage } from '../lib/errorMessage';

export const verifyToken = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.split(' ')[1];
  if (accessToken) {
    try {
      const decoded = jwt.verify(
        accessToken,
        process.env.NODE_SNS_ACCESS_SECRET
      ) as jwt.JwtPayload & {
        id: string;
      };
      const user = await dbClient.user.findUnique({ where: { id: decoded.id } });
      if (user) {
        req.user = user;
      }
      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        res.status(401);
        errorMessage(error.message);
      } else if (error instanceof Error) {
        res.status(500);
        errorMessage(error.message);
      }
      res.status(500);
      errorMessage('server error');
    }
  } else {
    res.sendStatus(401);
  }
});
