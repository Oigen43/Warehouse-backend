'use strict';

const messageCode = require('@const/messageCode');
const CustomError = require('@const/customError');
const { Goods } = require('@models');
const mapToCustomError = require('@utils/customErrorsHandler');
const statusesTTN = require('@const/statusesTTN');

class GoodsRepository {
    async create(goods, TTNId, transaction) {
        try {
            const promises = goods.map(item => {
                item.TTNId = TTNId;
                return Goods.create(item, { transaction });
                }
            );
            await Promise.all(promises);
        } catch (err) {
            throw mapToCustomError(err, messageCode.GOODS_CREATE_ERROR);
        }
    }
}

module.exports = new GoodsRepository();
