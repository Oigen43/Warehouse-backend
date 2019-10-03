'use strict';

const nodemailer = require('nodemailer');
const messageCode = require('../const/messageCode');

class EmailService {
    async sendMail(message) {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_SENDER_LOGIN,
                pass: process.env.EMAIL_SENDER_PASSWORD
            }
        });
        try {
            await transporter.sendMail(message);
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
