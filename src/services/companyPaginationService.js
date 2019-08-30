'use strict';

const companyRepository = require('../repositories/companyRepository');

class CompanyPaginationService {
    constructor({companyRepository}) {
        this.companyRepository = companyRepository;
    }

    async get(page, perPage) {
        const companies = await this.companyRepository.get();

        const start = (page - 1) * Number(perPage);
        const end = start + Number(perPage);

        const pagedCompanies = companies.slice(start, end);

        return pagedCompanies;
    }
}

module.exports = new CompanyPaginationService({companyRepository});
