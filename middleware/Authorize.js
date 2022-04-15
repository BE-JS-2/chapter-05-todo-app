require('dotenv').config();
const jwt = require('jsonwebtoken');
const { Api401Error, Api400Error } = require('./APIError');
const { 
  JWT_SECRET_KEY
} = process.env;

module.exports = (req, res, next) => {
  try {
    const [ Bearer, token ] = req.get('Authorization').split(' ');

    if (Bearer != "Bearer") {
      throw new Api400Error("Wrong token");
    }
    jwt.verify(token, JWT_SECRET_KEY, (err, pass) => {
      if (err) throw new Api401Error(err.message)

      if (pass) {
        req.user = pass;
        next()
      }
    })
  } catch (error) {
    next(error);
  }
}