import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "../utils/hooks/useForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit, buttonText }) {
  const { values, handleChange } = useForm({})

  useEffect(() => {
    values.name = '';
    values.link = '';
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlaceSubmit({
      name: values.name,
      link: values.link,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="section-add"
      title="New Place"
      isOpen={isOpen}
      onClose={onClose}
      formId="createCardForm"
      buttonText={buttonText}
    >
      <input
        onChange={handleChange}
        value={values.name || ''}
        className="popup__input popup__form-title"
        id="card-name-input"
        name="name"
        type="text"
        placeholder="Title"
        minLength="1"
        maxLength="30"
        required
      />
      <span id="card-name-input-error" className="popup__input-error"></span>
      <input
        onChange={handleChange}
        value={values.link || ''}
        className="popup__input popup__form-link"
        id="card-link-input"
        name="link"
        type="url"
        placeholder="Image link"
        required
      />
      <span id="card-link-input-error" className="popup__input-error"></span>
    </PopupWithForm>
  );
}
