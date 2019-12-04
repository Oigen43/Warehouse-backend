'use strict';

const nodemailer = require('nodemailer');
const schedule = require('node-schedule');

const { sequelize } = require('@models');
const userRepository = require('@repositories/userRepository');
const messageCode = require('@const/messageCode');
const jobSchedule = require('@config/cronSchedule');
const transporterConfig = require('@config/transporter');
const formatter = require('@utils/formatter');
const customErrorHandler = require('@utils/customErrorsHandler');
const mailsGenerator = require('@utils/mailsGenerator');

class EmailService {
    constructor({ userRepository }) {
        this.userRepository = userRepository;
    }

    async sendMail(message) {
        try {
            const transporter = nodemailer.createTransport(transporterConfig);
            await transporter.sendMail(message);
        } catch (err) {
            customErrorHandler.check(err, messageCode.EMAIL_SEND_FAILED);
        }
    }

    async watchHappyBirthdayMails() {
        const transporter = nodemailer.createTransport(transporterConfig);

        schedule.scheduleJob(jobSchedule.dailyJob, async () => {
            let count = 0;
            let users = [];
            let systemAdminEmail = null;
            let transaction;

                try {
                    transaction = await sequelize.transaction();
                    users = await this.userRepository.getBirthdayBoys(formatter.currentDate(), transaction);
                    systemAdminEmail = await this.userRepository.getSystemAdminEmail(transaction);
                    transaction.commit();
                } catch (err) {
                    transaction.rollback();
                    throw err;
                }

                if (users.length) {
                    const hourlyJob = schedule.scheduleJob(jobSchedule.hourlyJob, async () => {
                        const remainingUsers = users.slice();
                        try {
                            const promises = remainingUsers.map((user, index) => {
                                const promise = transporter.sendMail(mailsGenerator.getCongratulatoryMail(user.firstName, user.email));
                                users.splice(index, 1);
                                return promise;
                            });

                            await Promise.all(promises);
                            if (!users.length) { hourlyJob.cancel(); }
                        } catch (err) {
                            ++count;
                            if (count === 5) {
                                const message = users.length ? formatter.usersList(users) : 'Can not connect to database';
                                await transporter.sendMail(mailsGenerator.getCongratulatingFailMail(systemAdminEmail, message));
                                hourlyJob.cancel();
                            }
                        }
                    });
                }
            });
    }
}
module.exports = new EmailService({ userRepository });
