import AjaxWrapper from '../services/AjaxWraper.js';
import {EXTERNAL_SERVER_URL} from '../config/config.js';

export default class getAll {
	/**
	 * Get all the items
	 * @returns {Object} object that hold the items data
	 */
	static getAllItems() {
		return new Promise((resolve, reject) => {
			const body = {};

			const ajaxPromise = AjaxWrapper.executeAjax('GET',
				EXTERNAL_SERVER_URL + '/posts',
				JSON.stringify(body));

			ajaxPromise.then((data) => {
				try {
					resolve(data);
				}
				catch (error) {
					reject(data)
				}

			}).catch(() => {
				reject({success: false});
			});
		});
	}
}