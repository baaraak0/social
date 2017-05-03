import axios from 'axios';
import Storage from './Storage';

export default class AjaxWrapper
{
    /**
     * execute ajax call 
     * @param {String} requestMethod 
     * @param {String} requestUrl
     * @param {Object} requestHeader 
     * @param {Object} requestBody 
     * @param {String} requestDataType 
     * @returns {Promise}  
     */
    static executeAjax(requestMethod, 
                       requestUrl, 
                       requestBody)
    {
        return new Promise((resolve, reject) =>
        {
            // define ajax query
            const ajaxQuery = {
                method: requestMethod,
                url: requestUrl,
                data: requestBody,
				headers: {'Authorization': 'Token '+ Storage.getLocalStorage('jwt')},
			};

            // execute ajax query
            axios(ajaxQuery)
                .then((responseData)   =>  {
                    resolve(responseData.data); 
                })
                .catch((responseError) =>  {
                    reject(Error(responseError));
                });
        });
    }
}