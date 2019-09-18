'use strict';

const fs = require('fs').promises;
const path = require('path');
const fullPath = path.join(__dirname, '../db/companies.json');
const messageCode = require('../const/messageCode');

class CompanyRepository {
    async get(page = 1, perPage = 10) {
        const data = await fs.readFile(fullPath);
        const companiesData = JSON.parse(data);

        const companies = companiesData.filter(item => !item.deleted);
        const start = (page - 1) * perPage;
        const end = start + perPage;
        const pagedCompanies = companies.slice(start, end);

        return {
            data: {
                companies: pagedCompanies,
                companiesTotal: companies.length
            },
            done: true
        };
    }

    async create(newCompany) {
        const data = await fs.readFile(fullPath);
        const companies = JSON.parse(data);
        const company = {
            companyName: newCompany.companyName,
            address: newCompany.address,
            description: newCompany.description,
            active: true,
            date: new Date(),
            deleted: false,
        };

        if (companies.some(item => item.companyName === company.companyName)) {
            return {
                data: {
                    statusCode: messageCode.COMPANY_EXISTS
                },
                done: false
            };
        }

        companies.push(company);
        await fs.writeFile(fullPath, JSON.stringify(companies));
        return {
            data: {
                statusCode: messageCode.COMPANY_CREATED
            },
            done: true
        };
    }

    async update(company) {
        const data = await fs.readFile(fullPath);
        const companies = JSON.parse(data);

        const index = companies.findIndex(item => item.companyName === company.companyName);
        if (index === -1) {
            return {
                data: {
                    statusCode: messageCode.COMPANY_NOT_EXIST
                },
                done: false
            };
        }

        companies[index].companyName = company.companyName;
        companies[index].address = company.address;
        companies[index].description = company.description;
        await fs.writeFile(fullPath, JSON.stringify(companies));
        return {
            data: {
                statusCode: messageCode.COMPANY_UPDATED
            },
            done: true
        };
    }

    async remove(company) {
        const data = await fs.readFile(fullPath);
        const companies = JSON.parse(data);
        const index = companies.findIndex(item => item.companyName === company.companyName);
        if (index === -1) {
            return {
                data: {
                    statusCode: messageCode.COMPANY_NOT_EXIST
                },
                done: false
            };
        }

        companies[index].deleted = true;
        await fs.writeFile(fullPath, JSON.stringify(companies));
        return {
            data: {
                statusCode: messageCode.COMPANY_DELETED
            },
            done: true
        };
    }
}

module.exports = new CompanyRepository();
