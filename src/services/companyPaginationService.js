'use strict';

const companyRepository = require('../repositories/companyRepository');

class CompanyPaginationService {
    constructor({companyRepository}) {
        this.companyRepository = companyRepository;
    }

    async get(page, perPage) {
        const companies = await this.companyRepository.get();

        const start = (page - 1) * perPage;
        const end = start + perPage;

        const pagedCompanies = companies.slice(start, end);

        const limit = companies.length / perPage;

        return {
            companies: pagedCompanies,
            page_limit: limit
        };
    }
}

module.exports = new CompanyPaginationService({companyRepository});
