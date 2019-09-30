'use strict';

const Company = require('../server/models').Company;
const messageCode = require('../const/messageCode');

class CompanyRepository {
    async get(data, transaction) {
        const { page = 1, perPage = 10 } = data;
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
            done: true
        };
    }

    async create(newCompany, transaction) {
        const company = await Company.findOne({ where: { companyName: newCompany.companyName }, raw: true, transaction });
        if (company) {
            return {
                data: {
                    statusCode: messageCode.COMPANY_NAME_CONFLICT
                },
                done: false
            };
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
                createdCompany: addedCompany.dataValues,
                statusCode: messageCode.COMPANY_CREATE_SUCCESS
            },
            done: true
        };
    }

    async update(company, transaction) {
        const existingCompany = await Company.findOne({ where: { id: company.id }, raw: true, transaction });

        if (!existingCompany) {
            return {
                data: {
                    statusCode: messageCode.COMPANY_GET_UNKNOWN
                },
                done: false
            };
        }

        const isCompanyExists = await Company.findOne({where: {companyName: company.companyName}, raw: true, transaction});
        if (isCompanyExists && isCompanyExists.id !== company.id) {
            return {
                data: {
                    statusCode: messageCode.COMPANY_NAME_CONFLICT
                },
                done: false
            };
        }

        await Company.update(
            { companyName: company.companyName, address: company.address, description: company.description },
            { where: { id: company.id }, transaction }
        );

        return {
            data: {
                statusCode: messageCode.COMPANY_UPDATE_SUCCESS
            },
            done: true
        };
    }

    async remove(companyId, transaction) {
        const existingCompany = await Company.findOne({ where: { id: companyId }, raw: true, transaction });

        if (!existingCompany) {
            return {
                data: {
                    statusCode: messageCode.COMPANY_GET_UNKNOWN
                },
                done: false
            };
        }

        await Company.update(
            { deleted: true },
            { where: { id: companyId }, transaction }
        );

        return {
            data: {
                statusCode: messageCode.COMPANY_DELETE_SUCCESS
            },
            done: true
        };
    }
}

module.exports = new CompanyRepository();
