'use strict';

const data = require('../db/companiesData');

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

    async create(companyName, address, description) {
        const newCompany = JSON.stringify({
            company_name: companyName,
            address: address,
            description: description,
            date: new Date()
        });
        data.push(newCompany);
    }
}

module.exports = new CompanyRepository();
