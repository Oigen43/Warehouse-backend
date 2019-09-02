'use strict';

const data = require('../db/data');

class CompanyRepository {
    async get(page = 1, perPage = 10) {
        const companies = data;

        const start = (page - 1) * perPage;
        const end = start + perPage;

        const pagedCompanies = companies.slice(start, end);

        const limit = companies.length / perPage;

        return {
            companies: pagedCompanies,
            pageLimit: limit
        };
    }
}

module.exports = new CompanyRepository();
