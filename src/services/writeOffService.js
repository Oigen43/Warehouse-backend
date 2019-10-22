'use strict';

const { sequelize } = require('@models');
const writeOffRepository = require('@repositories/writeOffRepository');
const writeOffGoodsRepository = require('@repositories/writeOffGoodsRepository');
const goodsRepository = require('@repositories/goodsRepository');
const TTNRepository = require('@repositories/TTNRepository');
const statusesTTN = require('@const/statusesTTN');

class WriteOffService {
    constructor({ writeOffRepository, writeOffGoodsRepository, goodsRepository }) {
        this.writeOffRepository = writeOffRepository;
        this.writeOffGoodsRepository = writeOffGoodsRepository;
        this.goodsRepository = goodsRepository;
        this.TTNRepository = TTNRepository;
    }

    async create(writeOff, goods) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const { data, createdWriteOff } = await this.writeOffRepository.create(writeOff, goods, transaction);
            await this.writeOffGoodsRepository.create(createdWriteOff, goods, transaction);
            await this.goodsRepository.update(goods, writeOff.TTNId, transaction);
            await this.TTNRepository.changeStatus(writeOff.TTNId, statusesTTN.CONFIRMED_STATUS, transaction);
            await transaction.commit();
            return data;
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
                throw err;
            }
        }
    }
}

module.exports = new WriteOffService({ writeOffRepository, writeOffGoodsRepository, goodsRepository });
