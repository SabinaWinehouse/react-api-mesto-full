import React, { useContext } from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main(
	{ cards,
		handleAddPopupClick,
		handleCardClick,
		handleCardDelete,
		handleCardLike,
		handleEditAvatarPopupClick,
		handleEditPopupClick
	}) {
	const currentUser = useContext(CurrentUserContext);
	console.log("CURRENT", currentUser);

	return (
		<main>
			<section className="profile">
				<div className="profile__container">
					<img
						src={currentUser.avatar}
						alt="profile"
						className="profile__picture"
					/>
					<button
						className="profile__edit-avatar"
						type="button"
						onClick={handleEditAvatarPopupClick}
					></button>
				</div>
				<div className="profile__name-edit">
					<h1 className="profile__name">{currentUser.name}</h1>
					<button
						type="button"
						className="profile__button-edit"
						onClick={handleEditPopupClick}
					></button>
				</div>
				<p className="profile__subtitle">{currentUser.about}</p>

				<button
					type="button"
					className="profile__button-add"
					id="addButton"
					onClick={handleAddPopupClick}
				></button>
			</section>

			<div className="gallery">
				<ul className="gallery__list">
					{cards.map((card) => (
						<Card
							card={card}
							key={card._id}
							onCardClick={handleCardClick}
							onCardLike={handleCardLike}
							onCardDelete={handleCardDelete}
						/>
					))}
				</ul>
			</div>
		</main>
	);
}
