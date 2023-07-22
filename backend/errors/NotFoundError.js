const { NOT_FOUND_ERROR_CODE } = require('../constants/errorCodes');
const { NOT_FOUND } = require('../constants/errorMessages');

class NotFoundError extends Error {
  constructor(message = NOT_FOUND) {
    super(message);
    this.statusCode = NOT_FOUND_ERROR_CODE;
  }
}

module.exports = NotFoundError;
