'use strict';

const Storage = require('../server/models').Storage;
const Warehouse = require('../server/models').Warehouse;

class StorageRepository {
    async get(data, transaction) {
        const {page = 1, perPage = 10, warehouseId} = data;
        const start = (page - 1) * perPage;
        const [storagesData, storagesLength] = await Promise.all([
            Storage.findAll({
                include: [{
                    model: Warehouse,
                    as: 'warehouses',
                    where: {
                        id: warehouseId
                    }
                }],
                limit: perPage,
                offset: start,
                order: ['id'],
                transaction
            }),
            Storage.count({
                include: [{
                    model: Warehouse,
                    as: 'warehouses',
                    where: {
                        id: warehouseId
                    }
                }],
                transaction
            })
        ]);

        return {
            data: {
                storages: storagesData,
                storagesTotal: storagesLength
            },
            done: true
        };
    }
}

module.exports = new StorageRepository();
