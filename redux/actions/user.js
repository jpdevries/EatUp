require('isomorphic-fetch');

var SAVE_USER = 'SAVE_USER';
var saveUser = function(user) {
    return function(dispatch) {
        return fetch('ENDPOINT', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.lastName,
                    foodType: user.foodType
                })
            })
            .then(function(response) {
                if (response.status < 200 || response.status >= 300) {
                    var err = new Error(response.statusText);
                    err.response = response;
                    throw err;
                }
                return response;
            })
            .then(function(data) {
                return dispatch(userSaved);
            })
            .catch(function(err) {
                return dispatch(userNotSaved);
            });
    };
}

var USER_SAVED = 'USER_SAVED';
var userSaved = function() {
    return {
        type: USER_SAVED
    }
}

var USER_NOT_SAVED = 'USER_NOT_SAVED';
var userNotSaved = function() {
    return {
        type: USER_NOT_SAVED
    }
}

exports.SAVE_USER = SAVE_USER;
exports.saveUser = saveUser;
exports.USER_SAVED = USER_SAVED;
exports.userSaved = userSaved;
exports.USER_NOT_SAVED = USER_NOT_SAVED;
exports.userNotSaved = userNotSaved;
