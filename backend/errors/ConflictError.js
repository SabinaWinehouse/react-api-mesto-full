const { CONFLICT_ERROR_CODE } = require('../constants/errorCodes');
const { CONFLICT } = require('../constants/errorMessages');

class ConflictError extends Error {
  constructor(message = CONFLICT) {
    super(message);
    this.statusCode = CONFLICT_ERROR_CODE;
  }
}

module.exports = ConflictError;
