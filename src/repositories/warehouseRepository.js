'use strict';

const Warehouse = require('../server/models').Warehouse;
const messageCode = require('../const/messageCode');
const CustomError = require('../const/customError');

class WarehouseRepository {
    async get(data, transaction) {
        try {
            const { page = 1, perPage = 10, companyId } = data;
            const start = (page - 1) * perPage;
            const [warehousesData, warehousesLength] = await Promise.all([
                Warehouse.findAll({ where: { deleted: false, companyId: companyId }, limit: perPage, offset: start, order: ['id'], raw: true, transaction }),
                Warehouse.count({ where: { deleted: false, companyId: companyId }, raw: true, transaction })
            ]);
            return {
                data: {
                    warehouses: warehousesData,
                    warehousesTotal: warehousesLength
                }
            };
        } catch (err) {
            throw new CustomError({
                data: {
                    statusCode: messageCode.WAREHOUSES_LIST_GET_ERROR
                }
            });
        }
    }

    async create(newWarehouse, transaction) {
        const warehouse = await Warehouse.findOne({ where: { warehouseName: newWarehouse.warehouseName }, raw: true, transaction });

        if (warehouse) {
            return {
                data: {
                    statusCode: messageCode.WAREHOUSE_NAME_CONFLICT
                },
                done: false
            };
        }

        const warehouseTemplate = {
            warehouseName: newWarehouse.warehouseName,
            companyId: newWarehouse.companyInfo.id,
            companyName: newWarehouse.companyInfo.companyName,
            address: newWarehouse.address,
            active: true,
            deleted: false,
        };

        await Warehouse.create(warehouseTemplate, { transaction });

        return {
            data: {
                statusCode: messageCode.WAREHOUSE_CREATE_SUCCESS
            },
            done: true
        };
    }

    async update(warehouse, transaction) {
        const existingWarehouse = await Warehouse.findOne({ where: { id: warehouse.id }, raw: true, transaction });

        if (!existingWarehouse) {
            return {
                data: {
                    statusCode: messageCode.WAREHOUSE_GET_UNKNOWN
                },
                done: false
            };
        }

        const isWarehouseExists = await Warehouse.findOne({where: {warehouseName: warehouse.warehouseName}, raw: true, transaction});
        if (isWarehouseExists && isWarehouseExists.id !== warehouse.id) {
            return {
                data: {
                    statusCode: messageCode.WAREHOUSE_NAME_CONFLICT
                },
                done: false
            };
        }

        await Warehouse.update(
            { warehouseName: warehouse.warehouseName, address: warehouse.address },
            { where: { id: warehouse.id }, transaction }
        );

        return {
            data: {
                statusCode: messageCode.WAREHOUSE_UPDATE_SUCCESS
            },
            done: true
        };
    }

    async remove(warehouseId, transaction) {
        const existingWarehouse = await Warehouse.findOne({ where: { id: warehouseId }, raw: true, transaction });

        if (!existingWarehouse) {
            return {
                data: {
                    statusCode: messageCode.WAREHOUSE_GET_UNKNOWN
                },
                done: false
            };
        }

        await Warehouse.update(
            { deleted: true },
            { where: { id: warehouseId }, transaction }
        );

        return {
            data: {
                statusCode: messageCode.WAREHOUSE_DELETE_SUCCESS
            },
            done: true
        };
    }
}

module.exports = new WarehouseRepository();
