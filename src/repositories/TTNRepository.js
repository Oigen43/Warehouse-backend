'use strict';

const messageCode = require('@const/messageCode');
const CustomError = require('@const/customError');
const { TTN, Sender, Carrier, Transport, Driver, Warehouse, User, Receiver, Goods } = require('@models');
const mapToCustomError = require('@utils/customErrorsHandler');

class TTNRepository {
    async get(data, transaction) {
        try {
            const { page = 1, perPage = 10, statuses } = data;
            const start = (page - 1) * perPage;
            const [TTNData, TTNLength] = await Promise.all([
                TTN.findAll({ where: { deleted: false, status: statuses }, include: [{ model: Sender }, { model: Receiver }, { model: Carrier }], limit: perPage, offset: start, order: ['id'], transaction }),
                TTN.count({ where: { deleted: false, status: statuses }, raw: true, transaction })
            ]);

            return {
                data: {
                    TTN: TTNData,
                    TTNTotal: TTNLength
                }
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.TTN_LIST_GET_ERROR);
        }
    }

    async getById(id, transaction) {
        try {
            const existingTTN = await TTN.findOne({
                where: { id, deleted: false },
                include: [
                    { model: Carrier, attributes: ['id', 'name', 'upn', 'countryCode'] },
                    { model: Sender, attributes: ['id', 'senderName', 'upn', 'countryCode'] },
                    { model: Receiver, attributes: ['id', 'receiverName', 'upn', 'countryCode'] },
                    { model: Transport, attributes: ['id', 'transportType', 'transportNumber'] },
                    { model: Driver, attributes: ['id', 'firstName', 'surname', 'passportNumber', 'issuingDate'] },
                    { model: Warehouse, attributes: ['id', 'warehouseName'] },
                    { model: User, attributes: ['id', 'surname', 'firstName'] },
                    { model: Goods, foreignKey: 'TTNId', as: 'Goods' },
                    ],
                transaction
            });

            if (!existingTTN) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.TTN_GET_UNKNOWN
                    },
                });
            }

            return {
                data: {
                        TTN: existingTTN
                }
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.TTN_LIST_GET_ERROR);
        }
    }

    async create(newTTN, transaction) {
        try {
            const existingTTN = await TTN.findOne({ where: { number: newTTN.number }, raw: true, transaction });

            if (existingTTN) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.TTN_NUMBER_CONFLICT
                    }
                });
            }
            const TTNTemplate = {
                number: newTTN.number,
                dischargeDate: newTTN.dischargeDate,
                senderId: newTTN.sender ? newTTN.sender.id : null,
                receiverId: newTTN.receiver ? newTTN.receiver.id : null,
                carrierId: newTTN.carrier.id,
                transportId: newTTN.transport.id,
                driverId: newTTN.driver ? newTTN.driver.id : null,
                registrationDate: newTTN.registrationDate,
                description: newTTN.description,
                type: newTTN.type,
                status: newTTN.status,
                userId: newTTN.dispatcher.id,
                warehouseId: newTTN.warehouse.id,
                deleted: false
            };

            const createdTTN = await TTN.create(TTNTemplate, { transaction });

            return {
                data: {
                    data: {
                        statusCode: messageCode.TTN_CREATE_SUCCESS
                    }
                },
                TTNId: createdTTN.id
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.TTN_CREATE_ERROR);
        }
    }

    async update(newTTN, transaction) {
        try {
            const existingTTN = await TTN.findOne({ where: { id: newTTN.id }, raw: true, transaction });

            if (!existingTTN) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.TTN_GET_UNKNOWN
                    }
                });
            }

            const TTNTemplate = { ...existingTTN, ...newTTN};

            await TTN.update(TTNTemplate, { where: { id: newTTN.id }, transaction });

            return {
                data: {
                    data: {
                        statusCode: messageCode.TTN_UPDATE_SUCCESS
                    }
                },
                TTNId: newTTN.id
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.TTN_UPDATE_ERROR);
        }
    }

    async remove(id, transaction) {
        try {
            const existingTTN = await TTN.findOne({ where: { id }, raw: true, transaction });

            if (!existingTTN) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.TTN_GET_UNKNOWN
                    }
                });
            }

            await TTN.update(
                { deleted: true },
                { where: { id }, transaction }
            );

            return {
                data: {
                    statusCode: messageCode.TTN_DELETE_SUCCESS
                }
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.TTN_DELETE_ERROR);
        }
    }
}

module.exports = new TTNRepository();
