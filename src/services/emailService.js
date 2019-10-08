'use strict';

const nodemailer = require('nodemailer');
const messageCode = require('@const/messageCode');
const customErrorHandler = require('@utils/customErrorsHandler');

class EmailService {
    async sendMail(message) {
        try {
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL_SENDER_LOGIN,
                    pass: process.env.EMAIL_SENDER_PASSWORD
                }
            });

            await transporter.sendMail(message);
        } catch (err) {
            customErrorHandler.check(err, messageCode.EMAIL_SEND_FAILED);
        }
    }
}
module.exports = new EmailService();
