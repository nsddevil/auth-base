import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';
import { dbClient } from '../db';
import { errorMessage } from '../lib/errorMessage';
import { signToken } from '../lib/jwtGenerate';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, displayName } = req.body;
  if (!email || !password || !displayName) {
    res.status(400);
    errorMessage('잘못된 요청입니다.');
  }
  try {
    const exists = await dbClient.user.findUnique({
      where: { email },
    });
    if (exists) {
      res.status(400);
      errorMessage('사용중인 이메일입니다.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await dbClient.user.create({
      data: {
        email,
        password: hashedPassword,
        displayName,
      },
    });

    res.status(200).json({ ok: true });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500);
      errorMessage(error.message);
    }
  }
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  if (req.user) {
    const accessToken = signToken('accessToken', { id: req.user.id }) as string;
    const refreshToken = signToken('refreshToken', { id: req.user.id }) as string;
    try {
      await dbClient.token.create({
        data: {
          authorId: req.user.id,
          refreshToken,
        },
      });
    } catch (error: any) {
      res.status(500);
      errorMessage(error.message);
    }
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 14,
    });
    res.status(200).json({ ok: true, user: req.user, accessToken });
  } else {
    res.sendStatus(401);
  }
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  if (req.user) {
    try {
      await dbClient.token.delete({ where: { authorId: req.user?.id } });
      req.user = undefined;
      res.sendStatus(204);
    } catch (error: any) {
      res.status(400);
      errorMessage(error.message);
    }
  } else {
    res.status(400);
    errorMessage('로그인중이 아닙니다.');
  }
});
