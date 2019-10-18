'use strict';

const messageCode = require('@const/messageCode');
const CustomError = require('@const/customError');
const { TTN, Sender, Carrier } = require('@models');
const mapToCustomError = require('@utils/customErrorsHandler');
const statusesTTN = require('@const/statusesTTN');

class TTNRepository {
    async get(data, transaction) {
        try {
            const { page = 1, perPage = 10, statuses } = data;
            const start = (page - 1) * perPage;
            const [TTNData, TTNLength] = await Promise.all([
                TTN.findAll({ where: { deleted: false, status: statuses }, include: [{ model: Sender }, {model: Carrier }], limit: perPage, offset: start, order: ['id'], transaction }),
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
            const existingTTN = await TTN.findOne({ where: { id, deleted: false }, transaction });

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
                },
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
                senderId: newTTN.sender.id,
                carrierId: newTTN.carrier.id,
                transportId: newTTN.transport.id,
                driverId: newTTN.driver.id ? newTTN.driver.id : null,
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

    async changeStatus(id, transaction) {
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
                { status: statusesTTN.TAKEN_OUT_OF_STORAGE_STATUS }, { where: { id }, transaction }
            );

            return {
                data: {
                    statusCode: messageCode.TTN_STATUS_UPDATE_SUCCESS
                }
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.TTN_STATUS_UPDATE_ERROR);
        }
    }
}

module.exports = new TTNRepository();
