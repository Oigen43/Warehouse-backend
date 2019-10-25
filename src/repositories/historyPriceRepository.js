'use strict';

const { HistoryPrice } = require('@models');
const messageCode = require('@const/messageCode');
const mapToCustomError = require('@utils/customErrorsHandler');

class HistoryPriceRepository {
    async create(createdCompany, priceForm, transaction) {
        try {
            const historyPriceTemplate = {
                companyId: createdCompany.id,
                price: priceForm.dailyPrice,
                startDate: new Date(priceForm.activeDate),
                endDate: null
            };
            await HistoryPrice.create(historyPriceTemplate, { transaction });
        } catch (err) {
            throw mapToCustomError(err, messageCode.HISTORY_PRICE_CREATE_ERROR);
        }
    }

    async resume(company, transaction) {
        try {
            const historyPriceTemplate = {
                companyId: company.id,
                price: company.price,
                startDate: new Date(),
                endDate: null
            };
            await HistoryPrice.create(historyPriceTemplate, transaction);
        } catch (err) {
            throw mapToCustomError(err, messageCode.HISTORY_PRICE_CREATE_ERROR);
        }
    }

    async suspend(company, transaction) {
        try {
            await HistoryPrice.update({ endDate: new Date() }, { where: { id: company['historyPrices.id'], endDate: null }, transaction });
        } catch (err) {
            throw mapToCustomError(err, messageCode.HISTORY_PRICE_CREATE_ERROR);
        }
    }

}

module.exports = new HistoryPriceRepository();
