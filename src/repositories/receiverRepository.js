'use strict';

const { Receiver } = require('@models');
const messageCode = require('@const/messageCode');
const CustomError = require('@const/customError');
const mapToCustomError = require('@utils/customErrorsHandler');

class ReceiverRepository {
    async get(data, transaction) {
        try {
            const { page = 1, perPage = 10 } = data;
            const start = (page - 1) * perPage;
            const [receiversData, receiversLength] = await Promise.all([
                Receiver.findAll({ where: { deleted: false }, limit: perPage, offset: start, order: ['id'], raw: true, transaction }),
                Receiver.count({ where: { deleted: false }, raw: true, transaction })
            ]);

            return {
                data: {
                    receivers: receiversData,
                    receiversTotal: receiversLength
                }
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.RECEIVERS_LIST_GET_ERROR);
        }
    }

    async getById(id, transaction) {
        try {
            const receiver = await Receiver.findOne({ where: { id, deleted: false }, transaction });

            if (!receiver) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.RECEIVER_GET_UNKNOWN
                    },
                });
            }

            return {
                data: {
                    receiver: receiver
                },
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.RECEIVERS_LIST_GET_ERROR);
        }
    }

    async getNames(transaction) {
        try {
            const receivers = await Receiver.findAll({ attributes: ['id', 'receiverName'], where: { deleted: false }, raw: true, transaction });

            return {
                data: {
                    receivers: receivers,
                }
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.RECEIVERS_LIST_GET_ERROR);
        }
    }

    async create(newReceiver, transaction) {
        try {
            const receiver = await Receiver.findOne({ where: { receiverName: newReceiver.receiverName }, raw: true, transaction });

            if (receiver) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.RECEIVER_NAME_CONFLICT
                    }
                });
            }

            const receiverTemplate = {
                receiverName: newReceiver.receiverName,
                upn: newReceiver.upn,
                countryCode: newReceiver.countryCode,
                date: new Date(),
                deleted: false,
            };

            await Receiver.create(receiverTemplate, { transaction });

            return {
                data: {
                    statusCode: messageCode.RECEIVER_CREATE_SUCCESS
                }
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.RECEIVER_CREATE_ERROR);
        }
    }

    async update(receiver, transaction) {
        try {
            const existingReceiver = await Receiver.findOne({ where: { id: receiver.id }, raw: true, transaction });

            if (!existingReceiver) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.RECEIVER_GET_UNKNOWN
                    }
                });
            }

            const isReceiverExists = await Receiver.findOne({where: {receiverName: receiver.receiverName}, raw: true, transaction});

            if (isReceiverExists && isReceiverExists.id !== receiver.id) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.RECEIVER_NAME_CONFLICT
                    }
                });
            }

            await Receiver.update(
                { receiverName: receiver.receiverName, upn: receiver.upn, countryCode: receiver.countryCode },
                { where: { id: receiver.id }, transaction }
            );

            return {
                data: {
                    statusCode: messageCode.RECEIVER_UPDATE_SUCCESS
                }
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.RECEIVER_UPDATE_ERROR);
        }
    }

    async remove(receiverId, transaction) {
        try {
            const existingReceiver = await Receiver.findOne({ where: { id: receiverId }, raw: true, transaction });

            if (!existingReceiver) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.RECEIVER_GET_UNKNOWN
                    }
                });
            }

            await Receiver.update(
                { deleted: true },
                { where: { id: receiverId }, transaction }
            );

            return {
                data: {
                    statusCode: messageCode.RECEIVER_DELETE_SUCCESS
                }
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.RECEIVER_DELETE_ERROR);
        }
    }
}

module.exports = new ReceiverRepository();
