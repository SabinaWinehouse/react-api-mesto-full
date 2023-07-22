import React from "react";
import Popup from "./Popup";

export default function InfoTooltip({ image, isOpen, onClose, text }) {
	return (
		<Popup
			isOpen={isOpen}
			onClose={onClose}
			name="tooltip"
		>
			<div className="popup__tooltip-content">
				<div className={`popup__icon-${image}`}/>
				<p className="popup__tooltip-text">{text}</p>
			</div>
		</Popup>
	)
}
