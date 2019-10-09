'use strict';

const roles = require('@const/roles');

const routesPermissions = {
    companies: {
        create: [roles.SYSTEM_ADMIN_ROLE],
        read: [roles.SYSTEM_ADMIN_ROLE, roles.COMPANY_ADMIN_ROLE],
        update: [roles.COMPANY_ADMIN_ROLE],
        delete: [roles.SYSTEM_ADMIN_ROLE]
    },
    warehouses: {
        create: [roles.COMPANY_ADMIN_ROLE],
        read: [roles.SYSTEM_ADMIN_ROLE, roles.COMPANY_ADMIN_ROLE],
        update: [roles.COMPANY_ADMIN_ROLE],
        delete: [roles.COMPANY_ADMIN_ROLE]
    },
    storages: {
        create: [roles.COMPANY_ADMIN_ROLE],
        read: [roles.SYSTEM_ADMIN_ROLE, roles.COMPANY_ADMIN_ROLE],
        update: [roles.COMPANY_ADMIN_ROLE],
        delete: [roles.COMPANY_ADMIN_ROLE]
    },
    storageTypes: {
        read: [roles.COMPANY_ADMIN_ROLE]
    },
    senders: {
        create: [roles.SYSTEM_ADMIN_ROLE],
        read: [roles.SYSTEM_ADMIN_ROLE],
        update: [roles.SYSTEM_ADMIN_ROLE],
        delete: [roles.SYSTEM_ADMIN_ROLE]
    },
    carriers: {
        create: [roles.SYSTEM_ADMIN_ROLE],
        read: [roles.SYSTEM_ADMIN_ROLE],
        update: [roles.SYSTEM_ADMIN_ROLE],
        delete: [roles.SYSTEM_ADMIN_ROLE]
    },
    drivers: {
        create: [roles.SYSTEM_ADMIN_ROLE],
        read: [roles.SYSTEM_ADMIN_ROLE],
        update: [roles.SYSTEM_ADMIN_ROLE],
        delete: [roles.SYSTEM_ADMIN_ROLE]
    },
    transport: {
        create: [roles.SYSTEM_ADMIN_ROLE],
        read: [roles.SYSTEM_ADMIN_ROLE],
        update: [roles.SYSTEM_ADMIN_ROLE],
        delete: [roles.SYSTEM_ADMIN_ROLE]
    },
    users: {
        create: [roles.SYSTEM_ADMIN_ROLE],
        read: [roles.SYSTEM_ADMIN_ROLE],
        update: [roles.SYSTEM_ADMIN_ROLE],
        delete: [roles.SYSTEM_ADMIN_ROLE]
    }
};

module.exports = routesPermissions;
