/* eslint-disable */
export default class Storage {
	static setLocalStorage(key, value) {
		if (typeof value == 'object' || typeof value == 'string') {
			value = JSON.stringify(value);
		}
		localStorage.setItem(key, value);
	}

	static getLocalStorage(key) {
		let value = localStorage.getItem(key) ;
		if (value == null) return null;

		if (typeof value == 'string') {
			value = JSON.parse(value);
		}

		return value;
	}

	static updateLocalStorage(key, value) {
		this.setLocalStorage(key, value);
	}

	static deleteLocalStorage(key) {
		localStorage.removeItem(key);
	}
}