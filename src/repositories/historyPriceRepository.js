'use strict';

const { HistoryPrice } = require('@models');
const { sequelize } = require('@models');
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

    async changePrice(company, transaction) {
        try {
            const historyPrice = await HistoryPrice.findOne({ where: { companyId: company.companyId, endDate: null } }, transaction);
            const historyPriceTemplate = {
                companyId: company.companyId,
                price: company.price,
                startDate: new Date(),
                endDate: null
            };

            if (historyPrice) {
                await Promise.all([
                    HistoryPrice.update({ endDate: new Date() }, { where: { id: historyPrice.id, endDate: null }, transaction }),
                    HistoryPrice.create(historyPriceTemplate, transaction)
                ]);

                return {
                    data: {
                        statusCode: messageCode.HISTORY_PRICE_UPDATE_SUCCESS
                    }
                };
            } else {
                await HistoryPrice.create(historyPriceTemplate, transaction);

                return {
                    data: {
                        statusCode: messageCode.HISTORY_PRICE_CREATE_SUCCESS
                    }
                };
            }
        } catch (err) {
            throw mapToCustomError(err, messageCode.HISTORY_PRICE_CREATE_ERROR);
        }
    }

    async getPrices(date, transaction) {
        try {
            const data = await sequelize.query('SELECT day::date, SUM(price) FROM generate_series(:startDate, :endDate, INTERVAL \'1 day\') day INNER JOIN public."HistoryPrices" on "startDate" <= day and ("endDate" >= day or "endDate" is null) GROUP BY day ORDER BY day', {
                replacements: { startDate: date.startDate, endDate: date.finalDate }
            }, { transaction });
            const arrayDate = data[0].map(item => {
                return item.day;
            });
            const arrayData = data[0].map(item => {
                return Number(item.sum);
            });
            return {
                data: {
                    arrayDate,
                    arrayData
                }
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.COMPANIES_GET_PRICES_ERROR);
        }
    }
}

module.exports = new HistoryPriceRepository();
