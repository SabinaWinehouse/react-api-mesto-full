import React, { useEffect } from "react";

function Popup({ isOpen, name, onClose, children }) {
	useEffect(() => {
		if (!isOpen) return;

		const closeByEscape = (e) => {
			if (e.key === 'Escape') {
				onClose();
			}
		}

		document.addEventListener('keydown', closeByEscape);
		return () => document.removeEventListener('keydown', closeByEscape);
	}, [isOpen, onClose])

	const handleOverlay = (e) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	}

	return (
		<div
			className={`popup ${isOpen ? "popup_open" : ""}`}
			onClick={handleOverlay}
			id={`popup__${name}`}
		>
			<div className={`popup__${name === 'image' ? 'image-' : ''}container`}>
				{children}
				<button
					className='popup__close'
					type='button'
					onClick={onClose}
				/>
			</div>
		</div>
	);
}

export default Popup;
