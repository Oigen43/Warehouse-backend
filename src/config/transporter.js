'use strict';

module.exports = {
    host: process.env.TRANSPORTER_HOST,
    port: process.env.TRANSPORTER_PORT,
    secure: true,
    auth: {
        user: process.env.EMAIL_SENDER_LOGIN,
        pass: process.env.EMAIL_SENDER_PASSWORD
    }
};
