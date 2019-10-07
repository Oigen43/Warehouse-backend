'use strict';

const routesPermissions = {
    companies: ['Admin', 'User'],
    warehouses: ['Admin', 'User'],
    users: ['Admin'],
    storages: ['Admin', 'Company Admin'],
    carriers: ['Admin'],
    senders: ['Admin']
};

module.exports = routesPermissions;
