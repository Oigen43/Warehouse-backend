'use strict';

const Storage = require('../server/models').Storage;
const StorageType = require('../server/models').StorageType;
const messageCode = require('../const/messageCode');
const CustomError = require('../const/customError');
const customErrorHandler = require('../utils/customErrorsHandler');

class StorageRepository {
    async get(data, transaction) {
        try {
            const {page = 1, perPage = 10, warehouseId} = data;
            const start = (page - 1) * perPage;
            const [storagesData, storagesLength] = await Promise.all([
                Storage.findAll({ where: { warehouseId: warehouseId, deleted: false }, include: { model: StorageType }, limit: perPage, offset: start, order: ['id'], transaction }),
                Storage.count({ where: {warehouseId: warehouseId}, transaction })
            ]);

            return {
                data: {
                    storages: storagesData,
                    storagesTotal: storagesLength
                }
            };
        } catch (err) {
            customErrorHandler.check(err, messageCode.STORAGES_LIST_GET_ERROR);
        }
    }

    async create(newStorage, transaction) {
        try {
            const storageTemplate = {
                storageCapacity: newStorage.storageCapacity,
                warehouseId: newStorage.warehouseInfo.id,
                storageTypeId: newStorage.storageType,
                deleted: false,
            };

            await Storage.create(storageTemplate, {transaction});

            return {
                data: {
                    statusCode: messageCode.STORAGE_CREATE_SUCCESS
                }
            };
        } catch (err) {
            customErrorHandler.check(err, messageCode.STORAGE_CREATE_ERROR);
        }
    }

    async update(storage, transaction) {
        try {
            const existingStorage = await Storage.findOne({ where: {id: storage.id}, raw: true, transaction });

            if (!existingStorage) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.STORAGE_GET_UNKNOWN
                    }
                });
            }

            await Storage.update({ storageCapacity: storage.storageCapacity, storageTypeId: storage.storageType }, { where: {id: storage.id}, transaction });

            return {
                data: {
                    statusCode: messageCode.STORAGE_UPDATE_SUCCESS
                }
            };
        } catch (err) {
            customErrorHandler.check(err, messageCode.STORAGE_UPDATE_ERROR);
        }
    }

    async remove(storageId, transaction) {
        try {
            const existingStorage = await Storage.findOne({ where: {id: storageId}, raw: true, transaction });

            if (!existingStorage) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.STORAGE_GET_UNKNOWN
                    }
                });
            }

            await Storage.update({ deleted: true }, { where: {id: storageId}, transaction });

            return {
                data: {
                    statusCode: messageCode.STORAGE_DELETE_SUCCESS
                }
            };
        } catch (err) {
            customErrorHandler.check(err, messageCode.STORAGE_DELETE_ERROR);
        }
    }
}

module.exports = new StorageRepository();
