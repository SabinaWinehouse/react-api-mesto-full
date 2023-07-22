import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onUpdateAvatar, onClose, buttonText }) {
	const inputAvatarRef = useRef();

	function handleSubmit(e) {
		e.preventDefault();
		onUpdateAvatar({
			avatar: inputAvatarRef.current.value,
		});
	}

	return (
		<PopupWithForm
			onSubmit={handleSubmit}
			name="edit-avatar"
			title="Edit Avatar"
			isOpen={isOpen}
			onClose={onClose}
			formId="editAvatarForm"
			buttonText={buttonText}
		>
			<input
				ref={inputAvatarRef}
				className="popup__input popup__form-name"
				id="avatar-link-input"
				name="avatar"
				type="text"
				placeholder="Link"
				required
			/>
			<span id="avatar-link-input-error" className="popup__input-error"></span>
		</PopupWithForm>
	);
}
