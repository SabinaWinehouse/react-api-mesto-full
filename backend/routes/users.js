const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { isURL } = require('validator');

const {
  getAllUsers,
  getUserById,
  updateUserAvatar,
  updateUserProfile,
  getMe,
} = require('../controllers/user');

userRouter.get('/', getAllUsers);
userRouter.get('/me', getMe);

userRouter.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
}), getUserById);

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUserProfile);

userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom((url, helpers) => {
      if (!isURL(url)) {
        return helpers.error('URL is invalid');
      }
      return url;
    }),
  }),
}), updateUserAvatar);

module.exports = userRouter;
