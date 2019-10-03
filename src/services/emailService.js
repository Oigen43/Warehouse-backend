'use strict';

const sendGrid = require('../utils/sendGrid');
const mailsGenerator = require('../utils/mailsGenerator');
const messageCode = require('../const/messageCode');

class EmailService {
    async sendRegistrationEmail(firstName, email, token) {
        const message = mailsGenerator.getRegistrationMail(firstName, email, token);
        try {
            await sendGrid.sendMail(message);
            return { done: true };
        } catch (err) {
            return {
                data: {
                    statusCode: messageCode.EMAIL_SEND_FAILED
                },
                done: false
            };
        }
    }
}
module.exports = new EmailService();
