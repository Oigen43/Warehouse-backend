'use strict';

const {GoodsStorage} = require('@models');
const messageCode = require('@const/messageCode');
const CustomError = require('@const/customError');
const mapToCustomError = require('@utils/customErrorsHandler');

class GoodsStorageRepository {
    async create(goodsStorage, transaction) {
        try {
            await GoodsStorage.bulkCreate(goodsStorage, {transaction});

            return {
                data: {
                    statusCode: messageCode.GOODS_STORAGE_CREATE_SUCCESS
                }
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.GOODS_STORAGE_CREATE_ERROR);
        }
    }

    async update(goodsStorage, transaction) {
        try {
            const existingGoodsStorage = await GoodsStorage.findOne({ where: {goodsId: goodsStorage[0].goodsId}, raw: true, transaction });

            if (!existingGoodsStorage) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.GOODS_STORAGE_GET_UNKNOWN
                    }
                });
            }

            await GoodsStorage.destroy({ where: {goodsId: goodsStorage[0].goodsId}, transaction});
            await GoodsStorage.bulkCreate(goodsStorage, {transaction});

            return {
                data: {
                    statusCode: messageCode.GOODS_STORAGE_UPDATE_SUCCESS
                }
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.GOODS_STORAGE_UPDATE_ERROR);
        }
    }
}

module.exports = new GoodsStorageRepository();
