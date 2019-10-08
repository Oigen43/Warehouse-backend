'use strict';

const urls = require('@const/urls');

function getRegistrationMail(name, email, token) {
    return {
        from: 'WarehouseOnline000@gmail.com',
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

module.exports = {
    getRegistrationMail
};
