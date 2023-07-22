import React from "react";
import Popup from "./Popup";

export default function PopupWithForm({ name, isOpen, onClose, onSubmit, title, children, buttonText, formId }) {
	return (
		<Popup name={name} isOpen={isOpen} onClose={onClose}>
			<fieldset className="popup__fieldset">
				<h3 className="popup__profile">{title}</h3>
				<form onSubmit={onSubmit} name="popup_profile" className="popup__form" id={formId}>
					{children}
					<button
						className="popup__button popup__edit-profile"
						name="edit_profile_button"
						type="submit"
					>
						{buttonText}
					</button>
				</form>
			</fieldset>
		</Popup>
	);
}