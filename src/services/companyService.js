'use strict';

const companyRepository = require('../repositories/companyRepository');
const logger = require('../utils/logger');

class CompanyService {
    constructor({companyRepository}) {
        this.companyRepository = companyRepository;
    }

    async get() {
        const companies = await this.companyRepository.get();

        if (!companies) {
            throw logger.error('Companies not found');
        }

        return companies;
    }
}

module.exports = new CompanyService({companyRepository});
