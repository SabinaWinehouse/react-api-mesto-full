const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const {
  CARD_NOT_FOUND,
  NOT_YOUR_CARD,
  BAD_REQUEST,
} = require('../constants/errorMessages');

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch(() => next(new BadRequestError()));
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .orFail(new NotFoundError(CARD_NOT_FOUND))
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        return next(new ForbiddenError(NOT_YOUR_CARD));
      }
      return card.deleteOne()
        .then(() => res.send(card));
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST));
      } else {
        next(error);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail(new NotFoundError(CARD_NOT_FOUND))
    .then((likes) => res.send({ data: likes }))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).orFail(new NotFoundError(CARD_NOT_FOUND))
    .then((likes) => res.send({ data: likes }))
    .catch(next);
};
