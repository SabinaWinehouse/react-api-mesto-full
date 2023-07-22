const { VALIDATION_ERROR_CODE } = require('../constants/errorCodes');
const { BAD_REQUEST } = require('../constants/errorMessages');

class BadRequestError extends Error {
  constructor(message = BAD_REQUEST) {
    super(message);
    this.statusCode = VALIDATION_ERROR_CODE;
  }
}

module.exports = BadRequestError;
