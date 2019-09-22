'use strict';

const user = require('../repositories/userRepository');

module.exports = function (options) {
    return async function (req, res, next) {
        const data = await user.findRole();
        console.log(data);
        next();
    };
  };
