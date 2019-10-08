'use strict';

const CustomError = require('../const/customError');

module.exports = function (err, messageCode) {
    if (!(err instanceof CustomError)) {
        return new CustomError({
            data: {
                statusCode: messageCode
            }
        });
    }
    return err;
};
