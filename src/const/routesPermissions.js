'use strict';

const routesPermissions = {
    companies: ['Admin', 'User'],
    warehouses: ['Admin', 'User'],
    users: ['Admin'],
    storages: ['Admin', 'User'],
    carriers: ['Admin']
};

module.exports = routesPermissions;
