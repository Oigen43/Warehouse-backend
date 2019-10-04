'use strict';

const CustomError = require('../const/customError');

function check(err, messageCode) {
    if (!(err instanceof CustomError)) {
        throw new CustomError({
            data: {
                statusCode: messageCode
            }
        });
    }
    throw err;
}

module.exports = {
    check
};
