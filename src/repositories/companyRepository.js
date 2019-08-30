'use strict';

const data = require('../db/data');

class CompanyRepository {
    async get() {
        return data;
    }
}

module.exports = new CompanyRepository();
