'use strict';

const Carrier = require('../server/models').Carrier;
const messageCode = require('../const/messageCode');
const CustomError = require('../const/customError');
const customErrorHandler = require('../utils/customErrorsHandler');

class CarrierRepository {
    async get(data, transaction) {
        try {
            const {page = 1, perPage = 10} = data;
            const start = (page - 1) * perPage;
            const [carriersData, carriersLength] = await Promise.all([
                Carrier.findAll({
                    where: {deleted: false},
                    limit: perPage,
                    offset: start,
                    order: ['id'],
                    raw: true,
                    transaction
                }),
                Carrier.count({where: {deleted: false}, raw: true, transaction})
            ]);

            return {
                data: {
                    carriers: carriersData,
                    carriersTotal: carriersLength
                }
            };
        } catch (err) {
            customErrorHandler.check(err, messageCode.CARRIERS_LIST_GET_ERROR);
        }
    }

    async create(newCarrier, transaction) {
        try {
            const carrier = await Carrier.findOne({where: {name: newCarrier.name}, raw: true, transaction});

            if (carrier) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.CARRIER_NAME_CONFLICT
                    }
                });
            }

            const carrierTemplate = {
                name: newCarrier.name,
                unp: newCarrier.unp,
                countryCode: newCarrier.countryCode,
                date: new Date(),
                deleted: false
            };

            const addedCarrier = await Carrier.create(carrierTemplate, {transaction});

            return {
                data: {
                    data: {
                        statusCode: messageCode.CARRIER_CREATE_SUCCESS
                    },
                },
                createdCarrier: addedCarrier.dataValues
            };
        } catch (err) {
            customErrorHandler.check(err, messageCode.CARRIER_CREATE_ERROR);
        }
    }

    async update(carrier, transaction) {
        try {
            const existingCarrier = await Carrier.findOne({where: {id: carrier.id}, raw: true, transaction});

            if (!existingCarrier) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.CARRIER_GET_UNKNOWN
                    }
                });
            }

            const isCarrierExists = await Carrier.findOne({where: {name: carrier.name}, raw: true, transaction});

            if (isCarrierExists && isCarrierExists.id !== carrier.id) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.CARRIER_NAME_CONFLICT
                    }
                });
            }

            await Carrier.update(
                {
                    name: carrier.name,
                    unp: carrier.unp,
                    countryCode: carrier.countryCode,
                }, {where: {id: carrier.id}, transaction}
            );

            return {
                data: {
                    data: {
                        statusCode: messageCode.CARRIER_UPDATE_SUCCESS
                    }
                },
                updatedCarrier: carrier,
            };
        } catch (err) {
            customErrorHandler.check(err, messageCode.CARRIER_UPDATE_ERROR);
        }
    }

    async remove(carrierId, transaction) {
        try {
            const existingCarrier = await Carrier.findOne({where: {id: carrierId}, raw: true, transaction});

            if (!existingCarrier) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.CARRIER_GET_UNKNOWN
                    }
                });
            }

            await Carrier.update(
                {deleted: true},
                {where: {id: carrierId}, transaction}
            );

            return {
                data: {
                    statusCode: messageCode.CARRIER_DELETE_SUCCESS
                }
            };
        } catch (err) {
            customErrorHandler.check(err, messageCode.CARRIER_DELETE_ERROR);
        }
    }
}

module.exports = new CarrierRepository();
