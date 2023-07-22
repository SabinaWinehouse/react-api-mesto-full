import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardDelete, onCardLike, onCardClick }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id || card.owner === currentUser._id;

  const cardDeleteButtonClassName = `card__delete-button ${
    isOwn ? "card__delete-button_visible" : "card__delete-button_hidden"
  }`;
  const isLiked = card.likes.some((userId) => userId === currentUser._id);

  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  function handleClick() {
    onCardClick(card);
  }
  function handleOnCardLike() {
    onCardLike(card);
  }
  function handleOnCardDelete() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      <button
        type="button"
        onClick={handleOnCardDelete}
        className={cardDeleteButtonClassName}
      ></button>

      <img
        src={card.link}
        alt={card.name}
        className="card__picture"
        onClick={handleClick}
      />
      <div className="card__description">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-wrapper">
          <button
            type="button"
            onClick={handleOnCardLike}
            className={cardLikeButtonClassName}
          ></button>
          <span className="class__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}
