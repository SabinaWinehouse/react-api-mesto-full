import React from "react";
import Popup from "./Popup";

export default function ImagePopup({ isOpen, card, onClose }) {
	return (
		<Popup isOpen={isOpen} onClose={onClose} name="image">
			<figure className="popup__figure">
				<img
					className="popup__image"
					src={card.link}
					alt={card.name}
				/>
				<figcaption className="popup__caption">{card.name}</figcaption>
			</figure>
		</Popup>
	)
}
