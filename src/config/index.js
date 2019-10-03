'use strict';

module.exports = {
    JWT: {
        secret: process.env.SECRET_JWT,
        life: process.env.JWT_LIVE,
        confirmationLife: process.env.CONFIRMATION_JWT_LIVE,
        refreshTokenLife: process.env.JWT_REFRESH_LIVE
    }
};
