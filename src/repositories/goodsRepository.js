'use strict';

const messageCode = require('@const/messageCode');
const { Goods } = require('@models');
const mapToCustomError = require('@utils/customErrorsHandler');

class GoodsRepository {
    async get(TTNId, transaction) {
        try {
            const goods = await Goods.findAll({ where: { TTNId }, transaction });
            return {
                data: {
                    goods: goods
                }
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.GOODS_LIST_GET_ERROR);
        }
    }

    async create(goods, TTNId, transaction) {
        try {
            const promises = goods.map(item => {
                item.TTNId = TTNId;
                return Goods.create(item, { transaction });
            });
            await Promise.all(promises);
        } catch (err) {
            throw mapToCustomError(err, messageCode.GOODS_CREATE_ERROR);
        }
    }

    async update(goods, TTNId, transaction) {
        try {
            const promises = goods.map(item => {
                    const goodsTemplate = {
                        volume: item.updatedVolume,
                        count: item.updatedCount,
                        weight: item.updatedWeight,
                        price: item.updatedPrice
                    };
                    return Goods.update(goodsTemplate, {
                        where: {
                            TTNId: TTNId,
                            name: item.name
                        },
                        transaction
                    });
                }
            );
            await Promise.all(promises);
        } catch (err) {
            throw mapToCustomError(err, messageCode.GOODS_DELETE_ERROR);
        }
    }

    async updateTTNId(TTNId, newTTNId, transaction) {
        try {
            await Goods.update({ TTNId: newTTNId }, { where: { TTNId }, transaction });
        } catch (err) {
            throw mapToCustomError(err, messageCode.GOODS_UPDATE_TTN_ID_ERROR);
        }
    }

    async destroy(TTNId, transaction) {
        try {
            await Goods.destroy({ where: { TTNId }, transaction });
        } catch (err) {
            throw mapToCustomError(err, messageCode.GOODS_DELETE_ERROR);
        }
    }
}

module.exports = new GoodsRepository();
