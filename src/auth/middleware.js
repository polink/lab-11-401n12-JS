'use strict';

const User = require('./users-model.js');

module.exports = (req, res, next) => {

    try {

        let [authType, encodedString] = req.headers.authorization.split(/\s+/);

        // BASIC Auth ... Authorization: Basic ZnJlZDpzYW1wbGU=

        switch (authType.toLowerCase()) {
            case 'basic':
                return _authBasic(encodedString);
            default:
                return _authError();
        }

    } catch (e) {
        return _authError();
    }
    function _authenticate(user) {
        if (user) {
            next();
        } else {
            _authError();
        }
    }

    function _authError() {
        next({status: 401, statusMessage: 'Unauthorized', message: 'Invalid creds.'});
    }
};
