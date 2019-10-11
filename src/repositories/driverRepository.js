'use strict';

const { Driver } = require('@models');
const messageCode = require('@const/messageCode');
const CustomError = require('@const/customError');
const mapToCustomError = require('@utils/customErrorsHandler');

class DriverRepository {
    async get(data, transaction) {
        try {
            const {page = 1, perPage = 10, carrierId} = data;
            const start = (page - 1) * perPage;
            const [driversData, driversLength] = await Promise.all([
                Driver.findAll({
                    where: {deleted: false, carrierId: carrierId},
                    limit: perPage,
                    offset: start,
                    order: ['id'],
                    raw: true,
                    transaction
                }),
                Driver.count({where: {deleted: false}, raw: true, transaction})
            ]);

            return {
                data: {
                    drivers: driversData,
                    driversTotal: driversLength
                }
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.DRIVERS_LIST_GET_ERROR);
        }
    }

    async getById(id, transaction) {
        try {
            const driver = await Driver.findOne({ where: { id, deleted: false }, transaction });

            if (!driver) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.DRIVER_GET_UNKNOWN
                    },
                });
            }

            return {
                data: {
                    driver: driver
                },
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.DRIVERS_LIST_GET_ERROR);
        }
    }

    async create(newDriver, transaction) {
        try {
            const driver = await Driver.findOne({where: {firstName: newDriver.firstName}, raw: true, transaction});

            if (driver) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.DRIVER_NAME_CONFLICT
                    }
                });
            }

            const driverTemplate = {
                firstName: newDriver.firstName,
                surname: newDriver.surname,
                passportNumber: newDriver.passportNumber,
                issuingDate: newDriver.issuingDate,
                carrierId: newDriver.carrierId,
                deleted: false
            };

            await Driver.create(driverTemplate, { transaction });

            return {
                data: {
                    statusCode: messageCode.DRIVER_CREATE_SUCCESS
                }
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.DRIVER_CREATE_ERROR);
        }
    }

    async update(driver, transaction) {
        try {
            const existingDriver = await Driver.findOne({where: {id: driver.id}, raw: true, transaction});

            if (!existingDriver) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.DRIVER_GET_UNKNOWN
                    }
                });
            }

            const isDriverExists = await Driver.findOne({where: {firstName: driver.firstName}, raw: true, transaction});

            if (isDriverExists && isDriverExists.id !== driver.id) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.DRIVER_NAME_CONFLICT
                    }
                });
            }

            await Driver.update(
                {
                    firstName: driver.firstName,
                    surname: driver.surname,
                    passportNumber: driver.passportNumber,
                    issuingDate: driver.issuingDate,
                }, {where: {id: driver.id}, transaction}
            );

            return {
                data: {
                    statusCode: messageCode.DRIVER_UPDATE_SUCCESS
                }
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.DRIVER_UPDATE_ERROR);
        }
    }

    async remove(driverId, transaction) {
        try {
            const existingDriver = await Driver.findOne({where: {id: driverId}, raw: true, transaction});

            if (!existingDriver) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.DRIVER_GET_UNKNOWN
                    }
                });
            }

            await Driver.update(
                {deleted: true},
                {where: {id: driverId}, transaction}
            );

            return {
                data: {
                    statusCode: messageCode.DRIVER_DELETE_SUCCESS
                }
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.DRIVER_DELETE_ERROR);
        }
    }
}

module.exports = new DriverRepository();
