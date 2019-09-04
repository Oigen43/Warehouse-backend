'use strict';

const companyRepository = require('../repositories/companyRepository');

class CompanyService {
    constructor({companyRepository}) {
        this.companyRepository = companyRepository;
    }

    async read(page, perPage) {
        const {companies, companiesTotal} = await this.companyRepository.read(page, perPage);

        if (!companies) {
            return [];
        }

        return {
            companies,
            companiesTotal
        };
    }
}

module.exports = new CompanyService({companyRepository});
