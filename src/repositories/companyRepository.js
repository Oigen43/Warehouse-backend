'use strict';

const Company = require('../server/models').Company;
const messageCode = require('../const/messageCode');
const CustomError = require('../const/customError');
const customErrorHandler = require('../utils/customErrorsHandler');

class CompanyRepository {
    async get(data, transaction) {
        try {
            const { page = 1, perPage = 10, id } = data;

            if (id) {
                const company = await Company.findAll({ where: { id, deleted: false }, raw: true, transaction });

                return {
                    data: {
                        companies: company,
                        companiesTotal: 1
                    },
                };
            } else {
                const start = (page - 1) * perPage;
                const [companiesData, companiesLength] = await Promise.all([
                    Company.findAll({ where: { deleted: false }, limit: perPage, offset: start, order: ['id'], raw: true, transaction }),
                    Company.count({ where: { deleted: false }, raw: true, transaction })
                ]);

                return {
                    data: {
                        companies: companiesData,
                        companiesTotal: companiesLength
                    },
                };
            }
        } catch (err) {
            customErrorHandler.check(err, messageCode.COMPANIES_LIST_GET_ERROR);
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
            customErrorHandler.check(err, messageCode.COMPANY_CREATE_ERROR);
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

            await Company.update(
                { companyName: company.companyName, address: company.address, description: company.description },
                { where: { id: company.id }, transaction }
            );

            return {
                data: {
                    statusCode: messageCode.COMPANY_UPDATE_SUCCESS
                }
            };
        } catch (err) {
            customErrorHandler.check(err, messageCode.COMPANY_UPDATE_ERROR);
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
            customErrorHandler.check(err, messageCode.COMPANY_DELETE_ERROR);
        }
    }
}

module.exports = new CompanyRepository();
