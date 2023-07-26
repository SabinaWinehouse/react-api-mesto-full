const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const {
  USER_NOT_FOUND,
  CONFLICT,
  INCORRECT_LOGIN_DATA,
  BAD_REQUEST,
} = require('../constants/errorMessages');
const BadRequestError = require('../errors/BadRequestError');

const { JWT_TOKEN_KEY = 'my-secret-jwt' } = process.env;

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params._id)
    .orFail(new NotFoundError(USER_NOT_FOUND))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.getMe = (req, res, next) => {
  const { _id: userId } = req.user;
  User.findById(userId)
    .orFail(new NotFoundError(USER_NOT_FOUND))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    email,
    password,
    avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then((user) => {
          res.status(201)
            .send({ data: { ...user } });
        })
        .catch((error) => {
          if (error.name === 'MongoServerError' && error.code === 11000) {
            next(new ConflictError(CONFLICT));
          } else if (error.name === 'ValidationError') {
            next(new BadRequestError(INCORRECT_LOGIN_DATA));
          } else {
            next(error);
          }
        });
    }).catch((err) => next(err));
};

module.exports.updateUserProfile = (req, res, next) => {
  const {
    name,
    about,
  } = req.body;

  User.findByIdAndUpdate(
    { _id: req.user._id },
    { name, about },
    {
      runValidators: true,
      new: true,
    },
  )
    .orFail(new NotFoundError(USER_NOT_FOUND))
    .then((user) => res.send({ data: user }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST));
      } else {
        next(error);
      }
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const id = new mongoose.Types.ObjectId(req.user._id);

  User.findByIdAndUpdate(
    id,
    { avatar },
    {
      runValidators: true,
      new: true,
    },
  )
    .orFail(new NotFoundError(USER_NOT_FOUND))
    .then((newAvatar) => res.send({ data: newAvatar }))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_TOKEN_KEY, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(() => next(new UnauthorizedError(INCORRECT_LOGIN_DATA)));
};
