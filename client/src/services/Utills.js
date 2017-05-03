/* eslint-disable */
/**
 * deep clone of objects
 * @param {Object} sourceObject the object to clone from
 * @returns {Object} the cloned object
 */
export function deepClone(sourceObject) {
    return JSON.parse(JSON.stringify(sourceObject));
}

/**
 * deep clone of objects
 * @param {Object} index=name of the field, value=user input value.
 * @returns {Object} object with the fields that failed.
 */
export function validationForm(userInput) {

    const result = {}
    for (let key in userInput) {
        switch (key) {
            case 'email':
                _validateEmail(userInput[key]) === false ? result[key] = userInput[key] : '';
                break;
            case 'password':
                break;
            default:
        }
    }

    function _validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(email)) {
            return true
        } else {
            return false
        }
    }

    return result;
}