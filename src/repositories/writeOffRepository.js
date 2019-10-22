'use strict';

const {WriteOff} = require('@models');
const messageCode = require('@const/messageCode');
const CustomError = require('@const/customError');
const mapToCustomError = require('@utils/customErrorsHandler');

class WriteOffRepository {
    async create(newWriteOff, goods, transaction) {
        try {
            const writeOff = await WriteOff.findOne({
                where: {number: newWriteOff.number},
                raw: true,
                transaction
            });

            if (writeOff) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.WRITE_OFF_NAME_CONFLICT
                    }
                });
            }

            const writeOffTemplate = {
                number: newWriteOff.number,
                TTNId: newWriteOff.TTNId,
                registrationDate: newWriteOff.registrationDate,
                controllerId: newWriteOff.controller.id
            };

            const createdWriteOff = await WriteOff.create(writeOffTemplate, {transaction});

            return {
                data: {
                    data: {
                        statusCode: messageCode.WRITE_OFF_CREATE_SUCCESS
                    },
                },
                createdWriteOff
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.WRITE_OFF_CREATE_ERROR);
        }
    }
}

module.exports = new WriteOffRepository();
