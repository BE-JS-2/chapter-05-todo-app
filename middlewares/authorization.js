const jwt = require('jsonwebtoken')

const authorization = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
          const decodedToken = jwt.decode(req.headers.authorization)
          req.user = decodedToken;
          next();
        } else {
          throw {
            status: 401,
            message: 'Unauthorized'
          }
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {authorization}