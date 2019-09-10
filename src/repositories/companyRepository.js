'use strict';

const fs = require('fs').promises;
const path = require('path');
const fullPath = path.join(__dirname, '../db/companies.json');

class CompanyRepository {
    async get(page = 1, perPage = 10) {
        const data = await fs.readFile(fullPath);
        const companiesData = JSON.parse(data);

        const companies = companiesData.filter(item => !item.deleted);
        const start = (page - 1) * perPage;
        const end = start + perPage;
        const pagedCompanies = companies.slice(start, end);

        return {
            data: {
                companies: pagedCompanies,
                companiesTotal: companies.length
            },
            done: true
        };
    }

    async create(newCompany) {
        const data = await fs.readFile(fullPath);
        const companies = JSON.parse(data);
        const company = {
            companyName: newCompany.companyName,
            address: newCompany.address,
            description: newCompany.description,
            active: true,
            date: new Date(),
            deleted: false,
        };

        if (companies.some(item => item.companyName === company.companyName)) {
            return {
                data: {
                    message: 'This company already exists'
                },
                done: false
            };
        }

        companies.push(company);
        await fs.writeFile(fullPath, JSON.stringify(companies));
        return {
            data: {
                message: 'Company created'
            },
            done: true
        };
    }

    async update(company) {
        const data = await fs.readFile(fullPath);
        const companies = JSON.parse(data);

        const index = companies.findIndex(item => item.companyName === company.companyName);
        if (index === -1) {
            return {
                data: {
                    message: 'This company does not exist'
                },
                done: false
            };
        }

        companies[index].companyName = company.companyName;
        companies[index].address = company.address;
        companies[index].description = company.description;
        await fs.writeFile(fullPath, JSON.stringify(companies));
        return {
            data: {
                message: 'Company updated'
            },
            done: true
        };
    }

    async remove(company) {
        const data = await fs.readFile(fullPath);
        const companies = JSON.parse(data);
        const index = companies.findIndex(item => item.companyName === company.companyName);
        if (index === -1) {
            return {
                data: {
                    message: 'This company does not exist'
                },
                done: false
            };
        }

        companies[index].deleted = true;
        await fs.writeFile(fullPath, JSON.stringify(companies));
        return {
            data: {
                message: 'Company deleted'
            },
            done: true
        };
    }
}

module.exports = new CompanyRepository();
