'use strict';

const StorageType = require('../server/models').StorageType;
const messageCode = require('../const/messageCode');
const customErrorHandler = require('../utils/customErrorsHandler');

class StorageTypesRepository {
    async get(transaction) {
        try {
            const storageTypesData = await StorageType.findAll({ order: ['id'], transaction });

            return {
                data: {
                    storageTypes: storageTypesData
                }
            };
        } catch (err) {
            customErrorHandler.check(err, messageCode.STORAGE_TYPES_LIST_GET_ERROR);
        }
    }
}

module.exports = new StorageTypesRepository();
