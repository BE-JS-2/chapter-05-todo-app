class APIError extends Error {
  constructor(message, name, statusCode) {
    super(message)
    this.message = message;
    this.name = name;
    this.statusCode = statusCode;
  }
}

module.exports = APIError;