'use strict';

const Warehouse = require('../server/models').Warehouse;
const messageCode = require('../const/messageCode');

class WarehouseRepository {
    async get(data, transaction) {
        const { page = 1, perPage = 10, companyName } = data;
        const start = (page - 1) * perPage;
        const [warehousesData, warehousesLength] = await Promise.all([
            Warehouse.findAll({ where: { deleted: false, companyName: companyName }, limit: perPage, offset: start, order: ['id'], raw: true, transaction }),
            Warehouse.count({ where: { deleted: false }, raw: true, transaction })
        ]);
        return {
            data: {
                warehouses: warehousesData,
                warehousesTotal: warehousesLength
            },
            done: true
        };
    }

    async create(newWarehouse, transaction) {
        const warehouse = await Warehouse.findOne({ where: { warehouseName: newWarehouse.warehouseName }, raw: true, transaction });

        if (warehouse) {
            return {
                data: {
                    statusCode: messageCode.WAREHOUSE_EXISTS
                },
                done: false
            };
        }

        const warehouseTemplate = {
            warehouseName: newWarehouse.warehouseName,
            companyName: newWarehouse.companyName,
            address: newWarehouse.address,
            type: newWarehouse.type,
            active: true,
            deleted: false,
        };

        await Warehouse.create(warehouseTemplate, { transaction });

        return {
            data: {
                statusCode: messageCode.WAREHOUSE_CREATED
            },
            done: true
        };
    }

    async update(warehouse, transaction) {
        const existingWarehouse = await Warehouse.findOne({ where: { warehouseName: warehouse.warehouseName }, raw: true, transaction });

        if (!existingWarehouse) {
            return {
                data: {
                    statusCode: messageCode.WAREHOUSE_NOT_EXIST
                },
                done: false
            };
        }

        await Warehouse.update(
            { address: warehouse.address, type: warehouse.type },
            { where: { warehouseName: warehouse.warehouseName }, transaction }
        );

        return {
            data: {
                statusCode: messageCode.WAREHOUSE_UPDATED
            },
            done: true
        };
    }

    async remove(warehouse, transaction) {
        const existingWarehouse = await Warehouse.findOne({ where: { warehouseName: warehouse.warehouseName }, raw: true, transaction });

        if (!existingWarehouse) {
            return {
                data: {
                    statusCode: messageCode.WAREHOUSE_NOT_EXIST
                },
                done: false
            };
        }

        await Warehouse.update(
            { deleted: true },
            { where: { warehouseName: warehouse.warehouseName }, transaction }
        );

        return {
            data: {
                statusCode: messageCode.WAREHOUSE_DELETED
            },
            done: true
        };
    }
}

module.exports = new WarehouseRepository();
