'use strict';

const { Company, HistoryPrice } = require('@models');
const messageCode = require('@const/messageCode');
const CustomError = require('@const/customError');
const mapToCustomError = require('@utils/customErrorsHandler');

class CompanyRepository {
    async get(data, transaction) {
        try {
            const { page = 1, perPage = 10 } = data;
            const start = (page - 1) * perPage;
            const [companiesData, companiesLength] = await Promise.all([
                Company.findAll({ where: { deleted: false }, include: [{ model: HistoryPrice, as: 'historyPrices', where: { endDate: null }, required: false }], limit: perPage, offset: start, order: ['id'], raw: true, transaction }),
                Company.count({ where: { deleted: false }, raw: true, transaction })
            ]);

            return {
                data: {
                    companies: companiesData,
                    companiesTotal: companiesLength
                },
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.COMPANIES_LIST_GET_ERROR);
        }
    }

    async getById(id, transaction) {
        try {
            const company = await Company.findOne({ where: { id, deleted: false }, raw: true, transaction });

            if (!company) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.COMPANY_GET_UNKNOWN
                    },
                });
            }

            return {
                data: {
                    companies: company,
                    companiesTotal: 1
                },
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.COMPANIES_LIST_GET_ERROR);
        }
    }

    async updateActive(company, transaction) {
        try {
            const existingCompany = await Company.findOne({ where: { id: company.id }, raw: true, transaction });

            if (!existingCompany) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.COMPANY_GET_UNKNOWN
                    },
                });
            }

            await Company.update(
                {
                  active: company.active,
                }, { where: { id: company.id }, transaction }
            );

            return {
                data: {
                    statusCode: messageCode.COMPANY_UPDATE_SUCCESS
                }
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.COMPANY_UPDATE_ERROR);
        }
    }

    async checkActive(id, transaction) {
        try {
            const companyActive = await Company.findOne({ where: { id, active: true, deleted: false }, raw: true, transaction });

            if (!companyActive) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.COMPANY_NOT_ACTIVE
                    },
                });
            }
        } catch (err) {
            throw mapToCustomError(err, messageCode.COMPANY_GET_UNKNOWN);
        }
    }

    async changePrice(company, transaction) {
        try {
            const existingCompany = await Company.findOne({ where: { id: company.companyId }, raw: true, transaction });

            if (!existingCompany) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.COMPANY_GET_UNKNOWN
                    },
                });
            }

            await Company.update(
                {
                    active: true,
                    price: company.price
                }, { where: { id: company.companyId }, transaction }
            );

            return {
                data: {
                    statusCode: messageCode.COMPANY_UPDATE_SUCCESS
                }
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.COMPANY_UPDATE_ERROR);
        }
    }

    async create(newCompany, transaction) {
        try {
            const company = await Company.findOne({ where: { companyName: newCompany.companyName }, raw: true, transaction });
            if (company) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.COMPANY_NAME_CONFLICT
                    }
                });
            }

            const companyTemplate = {
                companyName: newCompany.companyName,
                address: newCompany.address,
                description: newCompany.description,
                price: newCompany.price,
                active: true,
                date: new Date(),
                deleted: false,
            };
            const addedCompany = await Company.create(companyTemplate, { transaction });
            return {
                data: {
                    data: {
                        statusCode: messageCode.COMPANY_CREATE_SUCCESS
                    }
                },
                createdCompany: addedCompany.dataValues,
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.COMPANY_CREATE_ERROR);
        }
    }

    async update(company, transaction) {
        try {
            const existingCompany = await Company.findOne({ where: { id: company.id }, raw: true, transaction });

            if (!existingCompany) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.COMPANY_GET_UNKNOWN
                    },
                });
            }

            const isCompanyExists = await Company.findOne({where: {companyName: company.companyName}, raw: true, transaction});

            if (isCompanyExists && isCompanyExists.id !== company.id) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.COMPANY_NAME_CONFLICT
                    },
                });
            }

            const companyTemplate = {...existingCompany, ...company};

            await Company.update(
                companyTemplate,
                { where: { id: company.id }, transaction }
            );

            return {
                data: {
                    statusCode: messageCode.COMPANY_UPDATE_SUCCESS
                }
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.COMPANY_UPDATE_ERROR);
        }
    }

    async remove(companyId, transaction) {
        try {
            const existingCompany = await Company.findOne({ where: { id: companyId }, raw: true, transaction });

            if (!existingCompany) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.COMPANY_GET_UNKNOWN
                    },
                });
            }

            await Company.update(
                { deleted: true },
                { where: { id: companyId }, transaction }
            );

            return {
                data: {
                    statusCode: messageCode.COMPANY_DELETE_SUCCESS
                }
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.COMPANY_DELETE_ERROR);
        }
    }
}

module.exports = new CompanyRepository();
