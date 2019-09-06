'use strict';

const data = require('../db/companies.json');
const fs = require('fs').promises;
const path = require('path');
const fullPath = path.join(__dirname, '../db/companies.json');
const statusCode = require('../const/statusCode');

class CompanyRepository {
    async get(page = 1, perPage = 10) {
        const companies = data;

        const start = (page - 1) * perPage;
        const end = start + perPage;

        const pagedCompanies = companies.slice(start, end);

        return {
            companies: pagedCompanies,
            companiesTotal: companies.length
        };
    }

    async create(newCompany, res) {
        const companies = data;
        const company = {
            companyName: newCompany.companyName,
            address: newCompany.address,
            description: newCompany.description,
            active: true,
            date: new Date(),
            deleted: false,
        };
        if (companies.some(item => { return item.companyName === company.companyName; })) {
            return res.status(statusCode.CONFLICT).send({ message: 'This company already exists' });
        }

        companies.push(company);
        await fs.writeFile(fullPath, JSON.stringify(companies));
        return { message: 'Company created' };
    }
}

module.exports = new CompanyRepository();
