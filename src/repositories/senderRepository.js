'use strict';

const { Sender } = require('@models');
const messageCode = require('@const/messageCode');
const CustomError = require('@const/customError');
const mapToCustomError = require('@utils/customErrorsHandler');

class SenderRepository {
    async get(data, transaction) {
        try {
            const { page = 1, perPage = 10 } = data;
            const start = (page - 1) * perPage;
            const [sendersData, sendersLength] = await Promise.all([
                Sender.findAll({ where: { deleted: false }, limit: perPage, offset: start, order: ['id'], raw: true, transaction }),
                Sender.count({ where: { deleted: false }, raw: true, transaction })
            ]);

            return {
                data: {
                    senders: sendersData,
                    sendersTotal: sendersLength
                }
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.SENDERS_LIST_GET_ERROR);
        }
    }

    async create(newSender, transaction) {
        try {
            const sender = await Sender.findOne({ where: { senderName: newSender.senderName }, raw: true, transaction });

            if (sender) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.SENDER_NAME_CONFLICT
                    }
                });
            }

            const senderTemplate = {
                senderName: newSender.senderName,
                upn: newSender.upn,
                countryCode: newSender.countryCode,
                date: newSender.date,
                deleted: false,
            };

            await Sender.create(senderTemplate, { transaction });

            return {
                data: {
                    statusCode: messageCode.SENDER_CREATE_SUCCESS
                }
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.SENDER_CREATE_ERROR);
        }
    }

    async update(sender, transaction) {
        try {
            const existingSender = await Sender.findOne({ where: { id: sender.id }, raw: true, transaction });

            if (!existingSender) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.SENDER_GET_UNKNOWN
                    }
                });
            }

            const isSenderExists = await Sender.findOne({where: {senderName: sender.senderName}, raw: true, transaction});

            if (isSenderExists && isSenderExists.id !== sender.id) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.SENDER_NAME_CONFLICT
                    }
                });
            }

            await Sender.update(
                { senderName: sender.senderName, upn: sender.upn, countryCode: sender.countryCode, date: sender.date },
                { where: { id: sender.id }, transaction }
            );

            return {
                data: {
                    statusCode: messageCode.SENDER_UPDATE_SUCCESS
                }
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.SENDER_UPDATE_ERROR);
        }
    }

    async remove(senderId, transaction) {
        try {
            const existingSender = await Sender.findOne({ where: { id: senderId }, raw: true, transaction });

            if (!existingSender) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.SENDER_GET_UNKNOWN
                    }
                });
            }

            await Sender.update(
                { deleted: true },
                { where: { id: senderId }, transaction }
            );

            return {
                data: {
                    statusCode: messageCode.SENDER_DELETE_SUCCESS
                }
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.SENDER_DELETE_ERROR);
        }
    }
}

module.exports = new SenderRepository();
