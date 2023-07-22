import React from "react";
import { Link } from "react-router-dom";
import Logo from "../images/Logo.svg";
import CloseIcon from "../images/close_button.svg";
import BurgerMenuIcon from '../images/burger-menu.svg';

export const MobileMenu = ({ userEmail, isOpen, onLogout, handleBurgerClick, handleCloseClick }) => {
	const renderMobileMenu = () => {
		return (
			<div className="mobile-menu">
				<div className="mobile-menu__email-wrapper">
					<p className="mobile-menu">{userEmail}</p>
					<button className="mobile-menu__logout-button" onClick={onLogout} type="button">Log out</button>
				</div>
				<div className="mobile-menu__header">
					<Link to="/" className="header__home-link">
						<img src={Logo} className="header__logo" alt="logo"/>
					</Link>
					<img src={CloseIcon} alt="Close icon" onClick={handleCloseClick}/>
				</div>
			</div>
		)
	}

	return (
		<>
			{isOpen || <img src={BurgerMenuIcon} alt="burger menu" onClick={handleBurgerClick}/>}
			{isOpen && renderMobileMenu()}
		</>
	)
}