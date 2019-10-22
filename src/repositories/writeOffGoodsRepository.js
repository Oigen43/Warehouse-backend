'use strict';

const { WriteOffGoods } = require('@models');
const messageCode = require('@const/messageCode');
const mapToCustomError = require('@utils/customErrorsHandler');

class WriteOffGoodsRepository {
    async create(writeOff, goods, transaction) {
        try {
            const promises = goods.map(item => {
                    const writeOffGoodsTemplate = {
                        name: item.name,
                        originVolume: item.volume,
                        currentVolume: item.updatedVolume,
                        originCount: item.count,
                        currentCount: item.updatedCount,
                        originWeight: item.weight,
                        currentWeight: item.updatedWeight,
                        originPrice: item.price,
                        currentPrice: item.updatedPrice,
                        status: item.status,
                        writeOffId: writeOff.id,
                        TTNId: writeOff.TTNId
                    };
                    return WriteOffGoods.create(writeOffGoodsTemplate, {transaction});
                }
            );
            await Promise.all(promises);
        } catch (err) {
            throw mapToCustomError(err, messageCode.WRITE_OFF_CREATE_ERROR);
        }
    }
}

module.exports = new WriteOffGoodsRepository();
