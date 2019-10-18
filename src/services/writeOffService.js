'use strict';

const { sequelize } = require('@models');
const writeOffRepository = require('@repositories/writeOffRepository');

class WriteOffService {
    constructor({ writeOffRepository }) {
        this.writeOffRepository = writeOffRepository;
    }

    async create(writeOff, goods) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const data = await this.writeOffRepository.create(writeOff, goods, transaction);
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

module.exports = new WriteOffService({writeOffRepository});
