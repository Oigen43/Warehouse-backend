'use strict';

const messageCode = require('@const/messageCode');
const { archivedGoods } = require('@models');
const mapToCustomError = require('@utils/customErrorsHandler');

class ArchivedGoodsRepository {
    async create(goods, TTNId, transaction) {
        try {
            const promises = goods.map(item => {
                item.TTNId = TTNId;
                return archivedGoods.create(item, { transaction });
            });
            await Promise.all(promises);
        } catch (err) {
            throw mapToCustomError(err, messageCode.ARCHIVED_GOODS_CREATE_ERROR);
        }
    }
}

module.exports = new ArchivedGoodsRepository();
