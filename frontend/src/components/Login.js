import React, { useState } from "react";
import { Link } from 'react-router-dom';

export default function Login({ handleLogin }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		handleLogin(email, password);
	}

	return (
		<div className="auth">
			<h3 className="auth__title">Log in</h3>
			<form name="auth__form" className="auth__form" id="authForm" onSubmit={handleSubmit}>
				<div className="auth__inputs-wrapper">
					<input className="auth__input"
					       id="auth-email-input"
					       name="email"
					       type="email"
					       placeholder="Email"
					       minLength="1"
					       maxLength="30"
					       required
					       onChange={e => setEmail(e.target.value)}
					       value={email}
					/>
					<span id="auth-email-input-error" className="auth__input-error"></span>
					<input className="auth__input"
					       id="auth-password-input"
					       name="password"
					       type="password"
					       placeholder="Password"
					       minLength="1"
					       maxLength="30"
					       required
					       onChange={e => setPassword(e.target.value)}
					       value={password}
					/>
					<span id="auth-password-input-error" className="auth__input-error"></span>
				</div>
				<div className="auth__button-wrapper">
					<button className="auth__button" name="auth-submit-button" type="submit">
						Log in
					</button>
					<Link to="signup" className="auth__link">Not a member yet? Sign up here!</Link>
				</div>
			</form>
		</div>
	);
}
