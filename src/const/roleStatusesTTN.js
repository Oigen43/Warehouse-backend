'use strict';

const roles = require('@const/roles');
const statusesTTN = require('@const/statusesTTN');

const statuses = {
    [roles.COMPANY_ADMIN_ROLE]: [statusesTTN.REGISTERED_STATUS, statusesTTN.CONFIRMED_STATUS],
    [roles.WAREHOUSE_DISPATCHER_ROLE]: [statusesTTN.REGISTERED_STATUS, statusesTTN.IN_STORAGE_STATUS],
    [roles.WAREHOUSE_CONTROLLER_ROLE]: [statusesTTN.REGISTERED_STATUS, statusesTTN.RELEASE_ALLOWED_STATUS],
    [roles.WAREHOUSE_MANAGER_ROLE]: [statusesTTN.VERIFICATION_COMPLETED_STATUS, statusesTTN.CONFIRMED_STATUS]
};

module.exports = statuses;