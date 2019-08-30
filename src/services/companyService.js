'use strict';

const companyRepository = require('../repositories/companyRepository');

class CompanyService {
    constructor({companyRepository}) {
        this.companyRepository = companyRepository;
    }

    async get() {
        const companies = await this.companyRepository.get();

        if (!companies) {
            return [];
        }

        return companies;
    }
}

module.exports = new CompanyService({companyRepository});
