const { FORBIDDEN_ERROR_CODE } = require('../constants/errorCodes');
const { FORBIDDEN } = require('../constants/errorMessages');

class ForbiddenError extends Error {
  constructor(message = FORBIDDEN) {
    super(message);
    this.statusCode = FORBIDDEN_ERROR_CODE;
  }
}

module.exports = ForbiddenError;
