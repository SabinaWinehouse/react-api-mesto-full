import React, { useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "../utils/hooks/useForm";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, buttonText }) {
	const { values, handleChange, setValues } = useForm({});
	const currentUser = useContext(CurrentUserContext);

	useEffect(() => {
		setValues({ ...values, name: currentUser.name, job: currentUser.about })
	}, [currentUser, isOpen]);


	function handleSubmit(e) {
		e.preventDefault();
		onUpdateUser({
			name: values.name,
			about: values.job,
		});
	}

	return (
		<PopupWithForm
			onSubmit={handleSubmit}
			name="section-edit"
			title="Edit Profile"
			isOpen={isOpen}
			onClose={onClose}
			formId="editProfileForm"
			buttonText={buttonText}
		>
			<input
				onChange={handleChange}
				value={values.name || ''}
				className="popup__input popup__form-name"
				id="name-input"
				name="name"
				type="text"
				placeholder="Name"
				minLength="2"
				maxLength="40"
				required
			/>
			<span id="name-input-error" className="popup__input-error"></span>
			<input
				onChange={handleChange}
				value={values.job || ''}
				className="popup__input popup__form-subtitle"
				id="job-input"
				name="job"
				type="text"
				placeholder="About me"
				minLength="2"
				maxLength="200"
				required
			/>
			<span id="job-input-error" className="popup__input-error"></span>
		</PopupWithForm>
	);
}
