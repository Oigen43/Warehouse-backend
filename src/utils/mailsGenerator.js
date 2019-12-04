'use strict';

const urls = require('@const/urls');

function getRegistrationMail(name, email, token) {
    return {
        from: 'WarehouseOnline@gmail.com',
        to: email,
        subject: `💖Welcome to Warehouse Online! ${name}, please complete your registration💖`,
        html:
        `<p>
            ✌️ Hi, ${name}!<br>
            You're on your way!<br>
            Let's complete your registration.<br>
            <a href="${urls.BASE_URL}/confirmation?token=${token}">Complete registration</a>
        </p>`
    };
}

function getCongratulatoryMail(name, email) {
    return {
        from: 'WarehouseOnline@gmail.com',
        to: email,
        subject: '💖Happy Birthday💖',
        html:
        `<p>
            ✌️ Hi, ${name}!<br>
            🎉Happy birthday to a wonderful person who means so many different things to our company!🎉
        </p>`
    };
}

function getCongratulatingFailMail(systemAdminEmail, message) {
    return {
        from: 'WarehouseOnline@gmail.com',
        to: systemAdminEmail,
        subject: '❌Error❌',
        html:
        `<p>
           Can not send congratulating emails
           ${message}
        </p>`
    };
}

module.exports = {
    getRegistrationMail,
    getCongratulatoryMail,
    getCongratulatingFailMail
};
