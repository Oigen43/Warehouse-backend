'use strict';

const messageCode = require('@const/messageCode');
const CustomError = require('@const/customError');
const { TTN } = require('@models');
const mapToCustomError = require('@utils/customErrorsHandler');
const statusesTTN = require('@const/statusesTTN');

class TTNRepository {
    async get(data, transaction) {
        try {
            const { page = 1, perPage = 10, statuses } = data;
            const start = (page - 1) * perPage;
            const [TTNData, TTNLength] = await Promise.all([
                TTN.findAll({ where: { deleted: false, status: statuses }, limit: perPage, offset: start, order: ['id'], transaction }),
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

    async update(UpdatedTTN, transaction) {
        try {
            const existingTTN = await TTN.findOne({ where: { id: UpdatedTTN.id }, raw: true, transaction });

            if (!existingTTN) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.TTN_GET_UNKNOWN
                    }
                });
            }

            await TTN.update(
                { status: statusesTTN.TAKEN_OUT_OF_STORAGE_STATUS }, { where: { id: UpdatedTTN.id }, transaction }
            );

            return {
                data: {
                    statusCode: messageCode.TTN_UPDATE_SUCCESS
                }
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.TTN_UPDATE_ERROR);
        }
    }

    async remove(TTNId, transaction) {
        try {
            const existingTTN = await TTN.findOne({ where: { id: TTNId }, raw: true, transaction });

            if (!existingTTN) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.TTN_GET_UNKNOWN
                    }
                });
            }

            await TTN.update(
                { deleted: true },
                { where: { id: TTNId }, transaction }
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
