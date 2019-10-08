'use strict';

const StorageType = require('../server/models').StorageType;
const messageCode = require('../const/messageCode');
const mapToCustomError = require('../utils/customErrorsHandler');

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
            throw mapToCustomError(err, messageCode.STORAGE_TYPES_LIST_GET_ERROR);
        }
    }
}

module.exports = new StorageTypesRepository();
