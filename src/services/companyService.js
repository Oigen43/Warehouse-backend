'use strict';

const companyRepository = require('../repositories/companyRepository');

class CompanyService {
    constructor({companyRepository}) {
        this.companyRepository = companyRepository;
    }

    async get(page, perPage) {
        const data = await this.companyRepository.get(page, perPage);

        if (!data) {
            return [];
        }

        return data;
    }

    async create(newCompany) {
        const data = await this.companyRepository.create(newCompany);
        return data;
    }

    async update(company) {
        const data = await this.companyRepository.update(company);
        return data;
    }

    async remove(company) {
        const data = await this.companyRepository.remove(company);
        return data;
    }
}

module.exports = new CompanyService({companyRepository});
