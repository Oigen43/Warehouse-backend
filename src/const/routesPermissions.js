'use strict';

const roles = require('@const/roles');

const routesPermissions = {
    companies: {
        create: [roles.SYSTEM_ADMIN_ROLE],
        read: [roles.SYSTEM_ADMIN_ROLE, roles.COMPANY_ADMIN_ROLE],
        update: [roles.COMPANY_ADMIN_ROLE],
        delete: [roles.SYSTEM_ADMIN_ROLE],
        getById: [roles.SYSTEM_ADMIN_ROLE]
    },
    warehouses: {
        create: [roles.COMPANY_ADMIN_ROLE],
        read: [roles.SYSTEM_ADMIN_ROLE, roles.COMPANY_ADMIN_ROLE, roles.WAREHOUSE_MANAGER_ROLE, roles.WAREHOUSE_DISPATCHER_ROLE, roles.WAREHOUSE_CONTROLLER_ROLE],
        update: [roles.COMPANY_ADMIN_ROLE],
        delete: [roles.COMPANY_ADMIN_ROLE],
        getById: [roles.COMPANY_ADMIN_ROLE],
        getNames: [roles.SYSTEM_ADMIN_ROLE, roles.COMPANY_ADMIN_ROLE, roles.WAREHOUSE_DISPATCHER_ROLE]
    },
    storages: {
        create: [roles.COMPANY_ADMIN_ROLE],
        read: [roles.SYSTEM_ADMIN_ROLE, roles.COMPANY_ADMIN_ROLE, roles.WAREHOUSE_MANAGER_ROLE, roles.WAREHOUSE_DISPATCHER_ROLE, roles.WAREHOUSE_CONTROLLER_ROLE],
        update: [roles.COMPANY_ADMIN_ROLE],
        delete: [roles.COMPANY_ADMIN_ROLE],
        getById: [roles.COMPANY_ADMIN_ROLE]
    },
    storageTypes: {
        read: [roles.COMPANY_ADMIN_ROLE]
    },
    senders: {
        create: [roles.SYSTEM_ADMIN_ROLE],
        read: [roles.SYSTEM_ADMIN_ROLE],
        update: [roles.SYSTEM_ADMIN_ROLE],
        delete: [roles.SYSTEM_ADMIN_ROLE],
        getById: [roles.SYSTEM_ADMIN_ROLE],
        getNames: [roles.WAREHOUSE_DISPATCHER_ROLE]
    },
    receivers: {
        create: [roles.SYSTEM_ADMIN_ROLE],
        read: [roles.SYSTEM_ADMIN_ROLE],
        update: [roles.SYSTEM_ADMIN_ROLE],
        delete: [roles.SYSTEM_ADMIN_ROLE],
        getById: [roles.SYSTEM_ADMIN_ROLE],
        getNames: [roles.WAREHOUSE_DISPATCHER_ROLE]
    },
    carriers: {
        create: [roles.SYSTEM_ADMIN_ROLE],
        read: [roles.SYSTEM_ADMIN_ROLE],
        update: [roles.SYSTEM_ADMIN_ROLE],
        delete: [roles.SYSTEM_ADMIN_ROLE],
        getById: [roles.SYSTEM_ADMIN_ROLE],
        getNames: [roles.WAREHOUSE_DISPATCHER_ROLE]
    },
    drivers: {
        create: [roles.SYSTEM_ADMIN_ROLE],
        read: [roles.SYSTEM_ADMIN_ROLE],
        update: [roles.SYSTEM_ADMIN_ROLE],
        delete: [roles.SYSTEM_ADMIN_ROLE],
        getById: [roles.SYSTEM_ADMIN_ROLE],
        getNames: [roles.WAREHOUSE_DISPATCHER_ROLE]
    },
    transport: {
        create: [roles.SYSTEM_ADMIN_ROLE],
        read: [roles.SYSTEM_ADMIN_ROLE],
        update: [roles.SYSTEM_ADMIN_ROLE],
        delete: [roles.SYSTEM_ADMIN_ROLE],
        getById: [roles.SYSTEM_ADMIN_ROLE],
        getNames: [roles.WAREHOUSE_DISPATCHER_ROLE]
    },
    users: {
        create: [roles.SYSTEM_ADMIN_ROLE, roles.COMPANY_ADMIN_ROLE],
        read: [roles.SYSTEM_ADMIN_ROLE, roles.COMPANY_ADMIN_ROLE],
        update: [roles.SYSTEM_ADMIN_ROLE, roles.COMPANY_ADMIN_ROLE],
        delete: [roles.SYSTEM_ADMIN_ROLE, roles.COMPANY_ADMIN_ROLE],
        getById: [roles.SYSTEM_ADMIN_ROLE, roles.COMPANY_ADMIN_ROLE]
    },
    TTN: {
        create: [roles.WAREHOUSE_DISPATCHER_ROLE],
        read: [roles.COMPANY_ADMIN_ROLE, roles.WAREHOUSE_DISPATCHER_ROLE, roles.WAREHOUSE_CONTROLLER_ROLE, roles.WAREHOUSE_MANAGER_ROLE],
        update: [roles.WAREHOUSE_DISPATCHER_ROLE],
        delete: [roles.WAREHOUSE_DISPATCHER_ROLE],
        getById: [roles.WAREHOUSE_DISPATCHER_ROLE],
        check: [roles.WAREHOUSE_CONTROLLER_ROLE, roles.WAREHOUSE_MANAGER_ROLE]
    },
    goods: {
        read: [roles.WAREHOUSE_CONTROLLER_ROLE, roles.WAREHOUSE_MANAGER_ROLE],
    },
    goodsStorage: {
        create: [roles.SYSTEM_ADMIN_ROLE],
        update: [roles.SYSTEM_ADMIN_ROLE]
    }
};

module.exports = routesPermissions;
