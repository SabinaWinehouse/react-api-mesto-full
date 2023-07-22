const rateLimit = require('express-rate-limit');
const { MINUTES_COUNT, MINUTE_TO_MILLISECONDS_MULTIPLIER } = require('../constants/constantValues');

const rateLimiter = rateLimit({
  windowMs: MINUTES_COUNT * MINUTE_TO_MILLISECONDS_MULTIPLIER,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { rateLimiter };
