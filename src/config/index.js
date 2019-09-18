'use strict';

module.exports = {
    JWT: {
        secret: process.env.SECRET_JWT,
        life: process.env.JWT_LIVE
    }
};
