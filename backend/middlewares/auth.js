const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { JWT_TOKEN_KEY = 'token-secret-key' } = process.env;

module.exports = (req, res, next) => {
  const { authorization = '' } = req.headers;

  if (!authorization && !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError());
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? JWT_TOKEN_KEY : 'my-secret-jwt');	  
  } catch (error) {
    return next(new UnauthorizedError());
  }

  req.user = payload;
  return next();
};
