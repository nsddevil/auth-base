import { Strategy as LocalStrategy } from 'passport-local';
import { dbClient } from '../db';
import bcrypt from 'bcrypt';
import { excludeHelper } from '../lib/excludeHelper';

export default new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async function verify(email, password, done) {
    try {
      const user = await dbClient.user.findUnique({
        where: { email },
      });
      if (!user) return done(null, false);
      const isHashed = await bcrypt.compare(password, user.password);
      if (!isHashed) return done(null, false);
      return done(null, excludeHelper(user, 'password'));
    } catch (error) {
      return done(error, null);
    }
  }
);
