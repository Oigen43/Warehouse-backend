'use strict';

const roles = {
    SYSTEM_ADMIN_ROLE: 'System Admin',
    COMPANY_ADMIN_ROLE: 'Company Admin',
    WAREHOUSE_DISPATCHER_ROLE: 'Warehouse Dispatcher',
    WAREHOUSE_CONTROLLER_ROLE: 'Warehouse Controller',
    WAREHOUSE_MANAGER_ROLE: 'Warehouse Manager',

    indexes: {
        'System Admin': 1,
        'Company Admin': 2,
        'Warehouse Dispatcher': 3,
        'Warehouse Controller': 4,
        'Warehouse Manager': 5
    }
};

module.exports = roles;
