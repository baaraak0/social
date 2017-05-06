import AjaxWrapper from '../services/AjaxWraper.js';
import {EXTERNAL_SERVER_URL} from '../config/config.js';

export default class userModel {
    /**
     * Get all the items
     * @returns {Object} object that hold the items data
     */
    static Login(user) {
        return new Promise((resolve, reject) => {

            const ajaxPromise = AjaxWrapper.executeAjax('POST',
                EXTERNAL_SERVER_URL + '/users/login',
                user);
            ajaxPromise.then((data) => {
                try {
                    resolve(data);
                }
                catch (error) {
                    reject(error)
                }

            }).catch((err) => {
				console.log(err)
                reject({success: false});
            });
        });
    }


    static sendUserLocation(coords) {
        return new Promise((resolve, reject) => {

            const ajaxPromise = AjaxWrapper.executeAjax('POST',
                EXTERNAL_SERVER_URL + '/users/setCoords',
				coords);
            ajaxPromise.then((data) => {
                try {
					console.log(data)
                    resolve(data);
                }
                catch (error) {
                    reject(error)
                }

            }).catch(() => {
                reject({success: false});
            });
        });
    }

    /**
     * Get all the items
     * @returns {Object} object that hold the items data
     */
    static getUserByToken() {
        return new Promise((resolve, reject) => {

            const ajaxPromise = AjaxWrapper.executeAjax('GET',
                EXTERNAL_SERVER_URL + '/user'
            );
            ajaxPromise.then((data) => {
                try {
                    resolve(data);
                }
                catch (error) {
                    reject(error)
                }

            }).catch(() => {
                reject({success: false});
            });
        });
    }
    /**
     * Get all the items
     * @returns {Object} object that hold the items data
     */
    static sendCreatePost(post) {
        return new Promise((resolve, reject) => {

            const ajaxPromise = AjaxWrapper.executeAjax('POST',
                EXTERNAL_SERVER_URL + '/posts',
                post
            );
            ajaxPromise.then((data) => {
                try {
                    resolve(data);
                }
                catch (error) {
                    reject(error)
                }

            }).catch(() => {
                reject({success: false});
            });
        });
    }

	static getPostBySlugName(slug) {
		return new Promise((resolve, reject) => {

			const ajaxPromise = AjaxWrapper.executeAjax('GET',
				EXTERNAL_SERVER_URL + '/posts/' + slug,
				slug
			);
			ajaxPromise.then((data) => {
				try {
					resolve(data);
				}
				catch (error) {
					reject(error)
				}

			}).catch(() => {
				reject({success: false});
			});
		});
	}

    /**
     * Get all the items
     * @returns {Object} object that hold the items data
     */
    static registerAccount(user) {
        return new Promise((resolve, reject) => {

            const ajaxPromise = AjaxWrapper.executeAjax('POST',
                EXTERNAL_SERVER_URL + '/users',
				user);

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