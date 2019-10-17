'use strict';

const { Goods, Storage } = require('@models');
const messageCode = require('@const/messageCode');
const CustomError = require('@const/customError');
const mapToCustomError = require('@utils/customErrorsHandler');

class GoodsRepository {
    async get(transaction) {
        try {
            const goodsData = await Goods.findAll({ include: [{ model: Storage, through: 'GoodsStorage', as: 'storage', }], order: ['id'], transaction });

            return {
                data: {
                    goods: goodsData
                }
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.GOODS_LIST_GET_ERROR);
        }
    }

    async getById(id, transaction) {
        try {
            const goodsItemData = await Goods.findOne({ where: { id }, transaction });

            if (!goodsItemData) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.GOODS_GET_UNKNOWN
                    },
                });
            }

            return {
                data: {
                    goodsItem: goodsItemData
                },
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.GOODS_LIST_GET_ERROR);
        }
    }
}

module.exports = new GoodsRepository();
