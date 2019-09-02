'use strict';

const companyRepository = require('../repositories/companyRepository');

class CompanyService {
    constructor({companyRepository}) {
        this.companyRepository = companyRepository;
    }

    async get(page, perPage) {
        const {companies, pageLimit} = await this.companyRepository.get(page, perPage);

        if (!companies) {
            return [];
        }

        return {
            companies,
            pageLimit
        };
    }
}

module.exports = new CompanyService({companyRepository});
