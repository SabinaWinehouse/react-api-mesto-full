const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { CelebrateError } = require('celebrate');

const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./utils/rateLimiter');
const BadRequestError = require('./errors/BadRequestError');
const { SERVER_ERROR_CODE } = require('./constants/errorCodes');
const { SERVER_ERROR } = require('./constants/errorMessages');

require('dotenv').config();

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb').then(() => console.log("CONNECTED"));
app.use(helmet());
// app.use(limiter)
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(requestLogger);
app.use(errorLogger);

app.use((error, req, res, next) => {
  let err = error;
  if (err instanceof CelebrateError) {
    err = new BadRequestError();
  }
  const { statusCode = SERVER_ERROR_CODE, message } = err;
  res.status(statusCode)
    .send({ message: statusCode === SERVER_ERROR_CODE ? SERVER_ERROR : message });
  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('The server is running on PORT', PORT);
});
