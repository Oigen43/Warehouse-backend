'use strict';

const data = require('../db/companies.json');
const fs = require('fs');
const path = require('path');
const fullPath = path.join(__dirname, '../db/companies.json');

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
        const company = {
            companyName: newCompany.companyName,
            address: newCompany.address,
            description: newCompany.description,
            active: true,
            date: new Date(),
            deleted: false,
        };
        data.push(company);
        fs.writeFile(fullPath, JSON.stringify(data), function (err) {
            if (err) {
                throw new Error();
            } else {
                return res.status(201).send();
            }
        });
    }
}

module.exports = new CompanyRepository();
