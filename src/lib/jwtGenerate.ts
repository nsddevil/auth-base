import jwt from 'jsonwebtoken';

type TokenType = 'accessToken' | 'refreshToken';

export const signToken = (tokenType: TokenType, payload: object) => {
  if (tokenType === 'accessToken') {
    return jwt.sign(payload, process.env.NODE_SNS_ACCESS_SECRET, {
      expiresIn: '1h',
    });
  } else if (tokenType === 'refreshToken') {
    return jwt.sign(payload, process.env.NODE_SNS_REFRESH_SECRET, {
      expiresIn: '14d',
    });
  }
};
