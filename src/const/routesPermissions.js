'use strict';

const routesPermissions = {
    companies: {
        create: ['System Admin'],
        read: ['System Admin', 'Company Admin'],
        update: ['Company Admin'],
        delete: ['System Admin']
    },
    warehouses: {
        create: ['Company Admin'],
        read: ['System Admin', 'Company Admin'],
        update: ['Company Admin'],
        delete: ['Company Admin']
    },
    storages: {
        create: ['Company Admin'],
        read: ['System Admin', 'Company Admin'],
        update: ['Company Admin'],
        delete: ['Company Admin']
    },
    storageTypes: {
        read: ['Company Admin']
    },
    senders: {
        create: ['System Admin'],
        read: ['System Admin'],
        update: ['System Admin'],
        delete: ['System Admin']
    },
    carriers: {
        create: ['System Admin'],
        read: ['System Admin'],
        update: ['System Admin'],
        delete: ['System Admin']
    },
    users: {
        create: ['System Admin'],
        read: ['System Admin'],
        update: ['System Admin'],
        delete: ['System Admin']
    }
};

module.exports = routesPermissions;
