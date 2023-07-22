const router = require('express').Router();
const {
  Joi,
  celebrate,
} = require('celebrate');
const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/user');
const NotFoundError = require('../errors/NotFoundError');
const { NOT_FOUND } = require('../constants/errorMessages');

const userJoiSchema = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
};

router.post('/signup', celebrate(userJoiSchema), createUser);
router.post('/signin', celebrate(userJoiSchema), login);

router.use(auth);

router.use('/cards', cardRouter);
router.use('/users', userRouter);

router.use('/*', (req, res, next) => {
  next(new NotFoundError(NOT_FOUND));
});

module.exports = router;
