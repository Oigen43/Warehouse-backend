'use strict';

const { Storage, StorageType } = require('@models');
const messageCode = require('@const/messageCode');
const CustomError = require('@const/customError');
const mapToCustomError = require('@utils/customErrorsHandler');

class StorageRepository {
    async get(data, transaction) {
        try {
            const {page = 1, perPage = 10, warehouseId} = data;
            const start = (page - 1) * perPage;
            const [storagesData, storagesLength] = await Promise.all([
                Storage.findAll({ where: { warehouseId, deleted: false }, include: { model: StorageType }, limit: perPage, offset: start, order: ['id'], transaction }),
                Storage.count({ where: { warehouseId}, transaction })
            ]);

            return {
                data: {
                    storages: storagesData,
                    storagesTotal: storagesLength
                }
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.STORAGES_LIST_GET_ERROR);
        }
    }

    async getById(id, transaction) {
        try {
            const storage = await Storage.findOne({ where: { id, deleted: false }, include: { model: StorageType }, transaction });

            if (!storage) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.STORAGE_GET_UNKNOWN
                    },
                });
            }

            return {
                data: {
                    storage: storage.dataValues
                },
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.STORAGES_LIST_GET_ERROR);
        }
    }

    async getAll(warehouseId, transaction) {
        try {
            const storages = await Storage.findAll({ where: { warehouseId, deleted: false}, include: { model: StorageType }, transaction });

            if (!storages) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.STORAGE_GET_UNKNOWN
                    },
                });
            }

            return {
                data: {
                    storages: storages
                },
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.STORAGES_LIST_GET_ERROR);
        }
    }

    async create(newStorage, transaction) {
        try {
            const storageTemplate = {
                storageCapacity: newStorage.storageCapacity,
                currentCapacity: newStorage.currentCapacity,
                warehouseId: newStorage.warehouseId,
                storageTypeId: newStorage.storageType.id,
                deleted: false,
            };

            await Storage.create(storageTemplate, {transaction});

            return {
                data: {
                    statusCode: messageCode.STORAGE_CREATE_SUCCESS
                }
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.STORAGE_CREATE_ERROR);
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

            await Storage.update({ storageCapacity: storage.storageCapacity, storageTypeId: storage.storageType.id }, { where: {id: storage.id}, transaction });

            return {
                data: {
                    statusCode: messageCode.STORAGE_UPDATE_SUCCESS
                }
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.STORAGE_UPDATE_ERROR);
        }
    }

    async updateStorages(storages, transaction) {
        try {
            storages.forEach(element => {
                const storage = Storage.findOne({ where: {id: element.id}, raw: true, transaction });

                if (!storage) {
                    throw new CustomError({
                        data: {
                            statusCode: messageCode.STORAGE_GET_UNKNOWN
                        }
                    });
                }
            });

            const promises = storages.map(item =>
                Storage.update({ currentCapacity: item.currentCapacity }, { where: { id: item.id }, transaction})
            );
            await Promise.all(promises);

            return {
                data: {
                    statusCode: messageCode.STORAGE_UPDATE_SUCCESS
                }
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.STORAGE_UPDATE_ERROR);
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
            throw mapToCustomError(err, messageCode.STORAGE_DELETE_ERROR);
        }
    }
}

module.exports = new StorageRepository();
