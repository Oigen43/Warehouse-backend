'use strict';

const data = require('../db/companiesData');
const fs = require('fs');
const path = require('path');
const fullPath = path.join(__dirname, '../db/companiesData.json');

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

    async create(newCompany) {
        const company = {
            companyName: newCompany.companyName,
            address: newCompany.address,
            description: newCompany.description,
            active: newCompany.active,
            date: new Date()
        };
        data.push(company);
        fs.writeFile(fullPath, JSON.stringify(data), function (err) {
            if (err) {
                return { error: `Error: ${err}`};
            }
        });
    }
}

module.exports = new CompanyRepository();
