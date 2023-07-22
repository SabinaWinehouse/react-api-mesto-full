class Api {
	constructor({ baseUrl }) {
		this._baseUrl = baseUrl;
	}

	_handleResponse(response) {
		return response.ok ? response.json() : Promise.reject(response.status);
	}

	_request(url, options) {
		return fetch(url, options).then(this._handleResponse);
	}

	getUserInfo(token) {
		return this._request(this._baseUrl + "/users/me", {
			method: "GET",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		})
	}

	getInitialCards(token) {
		return this._request(this._baseUrl + "/cards", {
			method: "GET",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		})
	}

	editUserInfo({ name, about }, token) {
		return this._request(this._baseUrl + "/users/me", {
			method: "PATCH",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify({
				name,
				about,
			}),
		})
	}

	addNewCard(data, token) {
		return this._request(this._baseUrl + "/cards", {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify(data),
		})
	}

	changeLikeStatus(cardId, isLiked, token) {
		return this._request(this._baseUrl + "/cards/" + cardId + '/likes', {
			method: isLiked ? "DELETE" : "PUT",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
		})
	}

	deleteCard(cardId, token) {
		return this._request(this._baseUrl + "/cards/" + cardId, {
			method: "DELETE",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
		})
	}

	changeUserAvatar({ avatar }, token) {
		return this._request(this._baseUrl + "/users/me/avatar", {
			method: "PATCH",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify({
				avatar,
			}),
		})
	}
}

export const BASE_URL = process.env.NODE_ENV === 'production'
  ? "https://api.sabina.aroundtheus.jumpingcrab.com"
	: "http://localhost:3000";

export const api = new Api({ baseUrl: BASE_URL, });
