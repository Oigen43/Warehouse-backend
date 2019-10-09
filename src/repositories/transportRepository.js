'use strict';

const { Transport } = require('@models');
const messageCode = require('@const/messageCode');
const CustomError = require('@const/customError');
const mapToCustomError = require('@utils/customErrorsHandler');

class TransportRepository {
    async get(data, transaction) {
        try {
            const { page = 1, perPage = 10, carrierId } = data;
            const start = (page - 1) * perPage;
            const [transportData, transportLength] = await Promise.all([
                Transport.findAll({ where: { deleted: false, carrierId: carrierId }, limit: perPage, offset: start, order: ['id'], raw: true, transaction }),
                Transport.count({ where: { deleted: false, carrierId: carrierId }, raw: true, transaction })
            ]);

            return {
                data: {
                    transport: transportData,
                    transportTotal: transportLength
                }
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.TRANSPORT_LIST_GET_ERROR);
        }
    }

    async create(newTransport, transaction) {
        try {
            const transport = await Transport.findOne({ where: { transportNumber: newTransport.transportNumber }, raw: true, transaction });

            if (transport) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.TRANSPORT_NAME_CONFLICT
                    }
                });
            }

            const transportTemplate = {
                transportType: newTransport.transportType,
                transportNumber: newTransport.transportNumber,
                carrierId: newTransport.carrierInfo.id,
                carrierName: newTransport.carrierInfo.name,
                date: new Date(),
                deleted: false,
            };

            await Transport.create(transportTemplate, { transaction });

            return {
                data: {
                    statusCode: messageCode.TRANSPORT_CREATE_SUCCESS
                }
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.TRANSPORT_CREATE_ERROR);
        }
    }

    async update(transport, transaction) {
        try {
            const existingTransport = await Transport.findOne({ where: { id: transport.id }, raw: true, transaction });

            if (!existingTransport) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.TRANSPORT_GET_UNKNOWN
                    }
                });
            }

            const isTransportExists = await Transport.findOne({where: {transportNumber: transport.transportNumber}, raw: true, transaction});

            if (isTransportExists && isTransportExists.id !== transport.id) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.TRANSPORT_NAME_CONFLICT
                    }
                });
            }

            await Transport.update(
                { transportType: transport.transportType, transportNumber: transport.transportNumber },
                { where: { id: transport.id }, transaction }
            );

            return {
                data: {
                    statusCode: messageCode.TRANSPORT_UPDATE_SUCCESS
                }
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.TRANSPORT_UPDATE_ERROR);
        }
    }

    async remove(transportId, transaction) {
        try {
            const existingTransport = await Transport.findOne({ where: { id: transportId }, raw: true, transaction });

            if (!existingTransport) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.TRANSPORT_GET_UNKNOWN
                    }
                });
            }

            await Transport.update(
                { deleted: true },
                { where: { id: transportId }, transaction }
            );

            return {
                data: {
                    statusCode: messageCode.TRANSPORT_DELETE_SUCCESS
                }
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.TRANSPORT_DELETE_ERROR);
        }
    }
}

module.exports = new TransportRepository();
