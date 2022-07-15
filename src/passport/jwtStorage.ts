import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { dbClient } from '../db';
import { excludeHelper } from '../lib/excludeHelper';

export default new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.NODE_SNS_ACCESS_SECRET,
  },
  async function verify(jwt_payload, done) {
    try {
      const user = await dbClient.user.findUnique({
        where: { id: jwt_payload.id },
      });
      if (!user) return done(null, false);
      return done(null, excludeHelper(user, 'password'));
    } catch (error) {
      return done(error, false);
    }
  }
);
