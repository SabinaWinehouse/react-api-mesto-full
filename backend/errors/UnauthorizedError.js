const { UNAUTHORIZED_ERROR_CODE } = require('../constants/errorCodes');
const { UNAUTHORIZED } = require('../constants/errorMessages');

class UnauthorizedError extends Error {
  constructor(message = UNAUTHORIZED) {
    super(message);
    this.statusCode = UNAUTHORIZED_ERROR_CODE;
  }
}

module.exports = UnauthorizedError;
