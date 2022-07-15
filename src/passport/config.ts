import passport from 'passport';
import LocalStrategy from './localStorage';
import JwtStrategy from './jwtStorage';

const passportConfig = () => {
  passport.use(LocalStrategy);
  passport.use(JwtStrategy);
};

export default passportConfig;
