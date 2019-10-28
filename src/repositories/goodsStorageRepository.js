'use strict';

const {GoodsStorage, Storage} = require('@models');
const messageCode = require('@const/messageCode');
const mapToCustomError = require('@utils/customErrorsHandler');

class GoodsStorageRepository {
    async create(goodsData, storageData, transaction) {
        try {
            await GoodsStorage.bulkCreate(goodsData, {transaction});
            const promises = storageData.map(item =>
                Storage.update({ currentCapacity: item.currentCapacity }, { where: { id: item.id }, transaction})
            );
            await Promise.all(promises);

            return {
                data: {
                    statusCode: messageCode.GOODS_STORAGE_CREATE_SUCCESS
                }
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.GOODS_STORAGE_CREATE_ERROR);
        }
    }

    async destroy(goods, transaction) {
        try {
            const promises = goods.map(item =>
                GoodsStorage.destroy({ where: { goodsId: item.id }, transaction})
            );
            await Promise.all(promises);
            return true;
        } catch (err) {
            throw mapToCustomError(err, messageCode.GOODS_STORAGE_DESTROY_ERROR);
        }
    }
}

module.exports = new GoodsStorageRepository();
