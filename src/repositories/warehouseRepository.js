'use strict';

const { Warehouse, Company } = require('@models');
const messageCode = require('@const/messageCode');
const CustomError = require('@const/customError');
const mapToCustomError = require('@utils/customErrorsHandler');

class WarehouseRepository {
    async get(data, transaction) {
        try {
            const { page = 1, perPage = 10, companyId } = data;
            const start = (page - 1) * perPage;
            const [warehousesData, warehousesLength] = await Promise.all([
                Warehouse.findAll({ where: { deleted: false, companyId }, include: { model: Company }, limit: perPage, offset: start, order: ['id'], raw: true, transaction }),
                Warehouse.count({ where: { deleted: false, companyId }, raw: true, transaction })
            ]);

            return {
                data: {
                    warehouses: warehousesData,
                    warehousesTotal: warehousesLength
                }
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.WAREHOUSES_LIST_GET_ERROR);
        }
    }

    async getById(id, transaction) {
        try {
            const warehouse = await Warehouse.findOne({ where: { id, deleted: false }, include: { model: Company, attributes: ['companyName'] }, raw: true, transaction });

            if (!warehouse) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.WAREHOUSE_GET_UNKNOWN
                    },
                });
            }

            return {
                data: {
                    warehouses: warehouse,
                    warehousesTotal: 1
                },
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.WAREHOUSES_LIST_GET_ERROR);
        }
    }

    async getNames(companyId, transaction) {
        try {
            const warehouses = await Warehouse.findAll({ attributes: ['id', 'warehouseName'], where: { deleted: false, companyId }, raw: true, transaction });

            return {
                data: {
                    warehouses: warehouses,
                }
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.WAREHOUSES_LIST_GET_ERROR);
        }
    }

    async create(newWarehouse, transaction) {
        try {
            const warehouse = await Warehouse.findOne({ where: { warehouseName: newWarehouse.warehouseName }, raw: true, transaction });

            if (warehouse) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.WAREHOUSE_NAME_CONFLICT
                    }
                });
            }

            const warehouseTemplate = {
                warehouseName: newWarehouse.warehouseName,
                companyId: newWarehouse.companyId,
                address: newWarehouse.address,
                active: true,
                deleted: false,
            };

            await Warehouse.create(warehouseTemplate, { transaction });

            return {
                data: {
                    statusCode: messageCode.WAREHOUSE_CREATE_SUCCESS
                }
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.WAREHOUSE_CREATE_ERROR);
        }
    }

    async update(warehouse, transaction) {
        try {
            const existingWarehouse = await Warehouse.findOne({ where: { id: warehouse.id }, raw: true, transaction });

            if (!existingWarehouse) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.WAREHOUSE_GET_UNKNOWN
                    }
                });
            }

            const isWarehouseExists = await Warehouse.findOne({where: {warehouseName: warehouse.warehouseName}, raw: true, transaction});

            if (isWarehouseExists && isWarehouseExists.id !== warehouse.id) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.WAREHOUSE_NAME_CONFLICT
                    }
                });
            }

            const warehouseTemplate = {...existingWarehouse, ...warehouse};

            await Warehouse.update(
                warehouseTemplate,
                { where: { id: warehouse.id }, transaction }
            );

            return {
                data: {
                    statusCode: messageCode.WAREHOUSE_UPDATE_SUCCESS
                }
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.WAREHOUSE_UPDATE_ERROR);
        }
    }

    async remove(warehouseId, transaction) {
        try {
            const existingWarehouse = await Warehouse.findOne({ where: { id: warehouseId }, raw: true, transaction });

            if (!existingWarehouse) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.WAREHOUSE_GET_UNKNOWN
                    }
                });
            }

            await Warehouse.update(
                { deleted: true },
                { where: { id: warehouseId }, transaction }
            );

            return {
                data: {
                    statusCode: messageCode.WAREHOUSE_DELETE_SUCCESS
                }
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.WAREHOUSE_DELETE_ERROR);
        }
    }
}

module.exports = new WarehouseRepository();
