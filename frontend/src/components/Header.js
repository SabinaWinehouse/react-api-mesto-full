import React, { useEffect, useState } from "react";
import Logo from "../images/Logo.svg";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { MobileMenu } from "./MobileMenu";

export default function Header({ userEmail, onLogout, loggedIn }) {
	const location = useLocation();
	const [isBurgerMenuOpened, setIsBurgerMenuOpened] = useState(false);
	const [width, setWidth] = useState(window.innerWidth);

	const BREAKPOINT_PX = 476;

	useEffect(() => {
		const handleResizeWindow = () => setWidth(window.innerWidth);
		window.addEventListener("resize", handleResizeWindow);

		return () => {
			window.removeEventListener("resize", handleResizeWindow);
		};
	}, []);

	const isMobileMenu = width < BREAKPOINT_PX;

	useEffect(() => {
		if (!isMobileMenu) {
			setIsBurgerMenuOpened(false);
		}
	}, [isMobileMenu])

	const title = location.pathname === '/signup' ? 'Log in' : 'Sign up';
	const path = location.pathname === '/signup' ? "login" : 'signup';

	const handleOnBurgerClick = () => {
		setIsBurgerMenuOpened(true);
	}

	const handleOnCloseClick = () => {
		setIsBurgerMenuOpened(false);
	}
	const renderLoggedInHeader = () => {
		return (
			<div className="header__email-wrapper">
				<p className="header__email">{userEmail}</p>
				<button className="header__logout-button" onClick={onLogout} type="button">Log out</button>
			</div>
		)
	}

	return (
		<header className="header">
			{!isBurgerMenuOpened &&
				<Link to="/" className="header__home-link">
					<img src={Logo} className="header__logo" alt="logo"/>
				</Link>
			}
			{loggedIn ?
				isMobileMenu ?
					<MobileMenu
						userEmail={userEmail}
						onLogout={onLogout}
						isOpen={isBurgerMenuOpened}
						handleBurgerClick={handleOnBurgerClick}
						handleCloseClick={handleOnCloseClick}
					/>
					:
					renderLoggedInHeader()
				:
				<Link to={path} className="header__link">{title}</Link>
			}
		</header>
	);
}
