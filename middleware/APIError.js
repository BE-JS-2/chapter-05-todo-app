const BaseError = require('./BaseError');

class Api404Error extends BaseError {
  constructor(
    message,
    name = "ERR_NOT_FOUND",
    statusCode = 404,
  ) {
    super(message, name, statusCode)
  }
}

class Api400Error extends BaseError {
  constructor(
    message,
    name = "ERR_BAD_REQUEST",
    statusCode = 400,
  ) {
    super(message, name, statusCode)
  }
}

class Api401Error extends BaseError {
  constructor(
    message,
    name = "ERR_UNAUTHORIZED",
    statusCode = 401,
  ) {
    super(message, name, statusCode)
  }
}

class Api422Error extends BaseError {
  constructor(
    message,
    name = "ERR_UNPROCESSABLE_ENTITY",
    statusCode = 422,
  ) {
    super(message, name, statusCode)
  }
}

module.exports = { Api404Error, Api401Error, Api400Error, Api422Error };