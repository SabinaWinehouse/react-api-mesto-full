import React, { useState, useEffect } from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import Login from "./Login";
import { api } from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from '../utils/auth';
import { getToken, removeToken, setToken } from "../utils/token";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

function App() {
	const history = useHistory();
	const [cards, setCards] = useState([]);
	const [currentUser, setCurrentUser] = useState({});
	const [selectedCard, setSelectedCard] = useState({
		name: "",
		link: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [isCardPopupOpen, setIsCardPopupOpen] = useState(false);
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
		useState(false);
	const [isAddPlacePopupOpen, seIsAddPlacePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
		useState(false);
	const [infoTooltip, setInfoTooltip] =
		useState({ image: '', isOpen: false, text: '' })

	const [loggedIn, setLoggedIn] = useState(false);
	const [userEmail, setUserEmail] = useState('');

	useEffect(() => {
		checkToken();
	}, [])

	useEffect(() => {
		if (loggedIn) {
			Promise.all([api.getUserInfo(getToken()), api.getInitialCards(getToken())])
				.then(([user, cards]) => {
					setCurrentUser(user.data);
					setCards(cards.data);
				})
				.catch((error) => console.error(error));
		}
	}, [loggedIn]);

	function handleEditPopupClick() {
		setIsEditProfilePopupOpen(true);
	}

	function handleAddPopupClick() {
		seIsAddPlacePopupOpen(true);
	}

	function handleEditAvatarPopupClick() {
		setIsEditAvatarPopupOpen(true);
	}

	function handleCardClick(card) {
		setSelectedCard({ name: card.name, link: card.link });
		setIsCardPopupOpen(true);
	}

	function closeAllPopups() {
		setSelectedCard({ name: "", link: "" });
		setIsEditProfilePopupOpen(false);
		seIsAddPlacePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setIsCardPopupOpen(false);
		setInfoTooltip({ image: '', isOpen: false, text: '' })
	}

	function handleSubmit(request) {
		setIsLoading(true);
		request()
			.then(closeAllPopups)
			.catch(err => console.error(err))
			.finally(() => setIsLoading(false));
	}

	function handleUpdateUser({ name, about }) {
		function makeRequest() {
			return api.editUserInfo({ name, about }, getToken())
				.then(() => setCurrentUser({ ...currentUser, name, about }))
		}

		handleSubmit(makeRequest);
	}

	function handleUpdateAvatar({ avatar }) {
		function makeRequest() {
			return api.changeUserAvatar({ avatar }, getToken())
				.then((res) => {
					setCurrentUser({ ...currentUser, avatar });
				})
		}

		handleSubmit(makeRequest);
	}


	function handleCardLike(card) {
		const isLiked = card.likes.some((userId) => userId === currentUser._id);
		api.changeLikeStatus(card._id, isLiked, getToken())
			.then(({ data: newCard }) => {
				setCards((state) =>
					state.map((currentCard) =>
						currentCard._id === card._id ? newCard : currentCard
					)
				)
			}).catch((error) => console.error(error));
	}

	function handleCardDelete(card) {
		function makeRequest() {
			return api.deleteCard(card._id, getToken()).then(() => {
				setCards((state) =>
					state.filter((currentCard) => currentCard._id !== card._id)
				)
			})
		}

		handleSubmit(makeRequest);
	}

	function handleAddPlaceSubmit(newCard) {
		function makeRequest() {
			return api.addNewCard(newCard, getToken())
				.then((res) => {
					setCards([res, ...cards]);
				})
		}

		handleSubmit(makeRequest);
	}

	const handleLogin = (email, password) => {
		auth.login(email, password)
			.then(data => {
				if (data.token) {
					setUserEmail(email);
					setToken(data.token);
					setLoggedIn(true);
					history.push('/')
				}
			}).catch(err => {
			if (err.status === 401) {
				setInfoTooltip({
					image: 'fail',
					isOpen: true,
					text: 'The user with the specified email not found'
				})
			} else if (err.status === 400) {
				setInfoTooltip({
					image: 'fail',
					isOpen: true,
					text: 'One of the fields was filled in incorrectly'
				})
			} else {
				setInfoTooltip({
					image: 'fail',
					isOpen: true,
					text: 'Oops, something went wrong! Please try again.'
				})
			}
		})
	}

	const handleRegister = (email, password) => {
		auth.register(email, password)
			.then(data => {
				if (data.data) {
					setInfoTooltip({
						image: 'success',
						isOpen: true,
						text: 'Success! You have now been registered.'
					})
					history.push('/login');
				}
			}).catch(err => {
			if (err.status === 400) {
				setInfoTooltip({
					image: 'fail',
					isOpen: true,
					text: 'One of the fields was filled in incorrectly'
				})
			} else {
				setInfoTooltip({
					image: 'fail',
					isOpen: true,
					text: 'Oops, something went wrong! Please try again.'
				})
			}
		})
	}

	const checkToken = () => {
		if (getToken()) {
			auth.getImages(getToken())
				.then(res => {
					if (res.data) {
						setUserEmail(res.data.email);
						setLoggedIn(true);
						history.push('/');
					} else {
						handleLogout();
					}
				}).catch(err => console.error(err));
		}
	}

	const handleLogout = () => {
		removeToken();
		setLoggedIn(false);
		setCurrentUser({});
		setUserEmail('');
	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="page">
				<div className="page__content">
					<Header userEmail={userEmail} onLogout={handleLogout} loggedIn={loggedIn}/>
					<ProtectedRoute exact path='/' loggedIn={loggedIn}>
						<Main
							cards={cards}
							handleCardLike={handleCardLike}
							handleCardDelete={handleCardDelete}
							handleEditPopupClick={handleEditPopupClick}
							handleAddPopupClick={handleAddPopupClick}
							handleEditAvatarPopupClick={handleEditAvatarPopupClick}
							handleCardClick={handleCardClick}
						/>
					</ProtectedRoute>
					<Route path="/login">
						<Login handleLogin={handleLogin}/>
					</Route>
					<Route path="/signup">
						<Register handleRegister={handleRegister}/>
					</Route>
					<Footer/>
				</div>

				<EditProfilePopup
					isOpen={isEditProfilePopupOpen}
					onClose={closeAllPopups}
					onUpdateUser={handleUpdateUser}
					buttonText={isLoading ? 'Saving...' : 'Save'}
				/>

				<AddPlacePopup
					onAddPlaceSubmit={handleAddPlaceSubmit}
					onClose={closeAllPopups}
					isOpen={isAddPlacePopupOpen}
					buttonText={isLoading ? 'Saving...' : 'Save'}
				/>

				<EditAvatarPopup
					onUpdateAvatar={handleUpdateAvatar}
					isOpen={isEditAvatarPopupOpen}
					onClose={closeAllPopups}
					buttonText={isLoading ? 'Saving...' : 'Save'}
				/>
				<ImagePopup
					card={selectedCard}
					onClose={closeAllPopups}
					isOpen={isCardPopupOpen}
				/>
			</div>
			<InfoTooltip
				image={infoTooltip.image}
				isOpen={infoTooltip.isOpen}
				onClose={closeAllPopups}
				text={infoTooltip.text}
			/>
		</CurrentUserContext.Provider>
	);
}

export default App;
