'use strict';

const companyRepository = require('../repositories/companyRepository');

class CompanyService {
    constructor({companyRepository}) {
        this.companyRepository = companyRepository;
    }

    async get(page, perPage) {
        const {companies, companiesTotal} = await this.companyRepository.get(page, perPage);

        if (!companies) {
            return [];
        }

        return {
            companies,
            companiesTotal
        };
    }

    async create(companyName, address, description) {
        this.companyRepository.create(companyName, address, description);
    }
}

module.exports = new CompanyService({companyRepository});
