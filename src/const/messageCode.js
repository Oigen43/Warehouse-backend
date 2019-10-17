const messageCode = {
    USER_GET_ERROR: 'user.get.error',
    USERS_LIST_GET_ERROR: 'users.list.get.error',
    USER_GET_UNKNOWN: 'user.get.unknown',
    USER_INCORRECT_LOGIN_DATA: 'user.incorrect.login.data',
    USER_NAME_CONFLICT: 'user.name.conflict',
    USER_CREATE_SUCCESS: 'user.create.success',
    USER_CREATE_ERROR: 'user.create.error',
    USER_CREATE_ROLE_ERROR: 'user.create.role.error',
    USER_UPDATE_SUCCESS: 'user.update.success',
    USER_UPDATE_ROLE_ERROR: 'user.update.role.error',
    USER_UPDATE_ERROR: 'user.update.error',
    USER_DELETE_SUCCESS: 'user.delete.success',
    USER_DELETE_ERROR: 'user.delete.error',
    USER_GET_SUCCESS: 'user.get.success',
    USER_LOG_IN: 'user.log.in',
    USER_FIND_ERROR: 'user.find.error',
    USER_AUTHORIZATION_ERROR: 'user.authorization.error',
    USER_BLOCKED: 'user.blocked',
    USER_GET_CONFIRMATION_FORM_SUCCESS: 'user.get.confirmation.form.success',
    USER_GET_CONFIRMATION_FORM_ERROR: 'user.get.confirmation.form.error',
    USER_ROLES_GET_ERROR: 'user.roles.get.error',
    USER_REGISTRATION_SUCCESS: 'user.registration.success',

    WAREHOUSES_LIST_GET_ERROR: 'warehouses.list.get.error',
    WAREHOUSE_GET_UNKNOWN: 'warehouse.get.unknown',
    WAREHOUSE_CREATE_SUCCESS: 'warehouse.create.success',
    WAREHOUSE_CREATE_ERROR: 'warehouse.create.error',
    WAREHOUSE_NAME_CONFLICT: 'warehouse.name.conflict',
    WAREHOUSE_UPDATE_SUCCESS: 'warehouse.update.success',
    WAREHOUSE_UPDATE_ERROR: 'warehouse.update.error',
    WAREHOUSE_DELETE_SUCCESS: 'warehouse.delete.success',
    WAREHOUSE_DELETE_ERROR: 'warehouse.delete.error',
    WAREHOUSE_GET_SUCCESS: 'warehouse.get.success',

    COMPANIES_LIST_GET_ERROR: 'companies.list.get.error',
    COMPANY_GET_ERROR: 'company.get.error',
    COMPANY_GET_UNKNOWN: 'company.get.unknown',
    COMPANY_CREATE_ERROR: 'company.create.error',
    COMPANY_NAME_CONFLICT: 'company.name.conflict',
    COMPANY_CREATE_SUCCESS: 'company.create.success',
    COMPANY_UPDATE_SUCCESS: 'company.update.success',
    COMPANY_UPDATE_ERROR: 'company.update.error',
    COMPANY_DELETE_SUCCESS: 'company.delete.success',
    COMPANY_DELETE_ERROR: 'company.delete.error',
    COMPANY_GET_SUCCESS: 'company.get.success',

    STORAGES_LIST_GET_ERROR: 'storages.list.get.error',
    STORAGE_GET_UNKNOWN: 'storage.get.unknown',
    STORAGE_CREATE_ERROR: 'storage.create.error',
    STORAGE_CREATE_SUCCESS: 'storage.create.success',
    STORAGE_UPDATE_SUCCESS: 'storage.update.success',
    STORAGE_UPDATE_ERROR: 'storage.update.error',
    STORAGE_DELETE_SUCCESS: 'storage.delete.success',
    STORAGE_DELETE_ERROR: 'storage.delete.error',
    STORAGE_GET_SUCCESS: 'storage.get.success',

    STORAGE_TYPES_LIST_GET_ERROR: 'storage.types.list.get.error',

    CARRIERS_LIST_GET_ERROR: 'carriers.list.get.error',
    CARRIER_GET_UNKNOWN: 'carrier.get.unknown',
    CARRIER_CREATE_ERROR: 'carrier.create.error',
    CARRIER_NAME_CONFLICT: 'carrier.name.conflict',
    CARRIER_CREATE_SUCCESS: 'carrier.create.success',
    CARRIER_UPDATE_SUCCESS: 'carrier.update.success',
    CARRIER_UPDATE_ERROR: 'carrier.update.error',
    CARRIER_DELETE_SUCCESS: 'carrier.delete.success',
    CARRIER_DELETE_ERROR: 'carrier.delete.error',
    CARRIER_GET_SUCCESS: 'carrier.get.success',

    DRIVERS_LIST_GET_ERROR: 'drivers.list.get.error',
    DRIVER_GET_UNKNOWN: 'driver.get.unknown',
    DRIVER_CREATE_ERROR: 'driver.create.error',
    DRIVER_NAME_CONFLICT: 'driver.name.conflict',
    DRIVER_CREATE_SUCCESS: 'driver.create.success',
    DRIVER_UPDATE_SUCCESS: 'driver.update.success',
    DRIVER_UPDATE_ERROR: 'driver.update.error',
    DRIVER_DELETE_SUCCESS: 'driver.delete.success',
    DRIVER_DELETE_ERROR: 'driver.delete.error',

    SENDERS_LIST_GET_ERROR: 'senders.list.get.error',
    SENDER_GET_UNKNOWN: 'sender.get.unknown',
    SENDER_CREATE_ERROR: 'sender.create.error',
    SENDER_NAME_CONFLICT: 'sender.name.conflict',
    SENDER_CREATE_SUCCESS: 'sender.create.success',
    SENDER_UPDATE_SUCCESS: 'sender.update.success',
    SENDER_UPDATE_ERROR: 'sender.update.error',
    SENDER_DELETE_SUCCESS: 'sender.delete.success',
    SENDER_DELETE_ERROR: 'sender.delete.error',
    SENDER_GET_SUCCESS: 'sender.get.success',

    RECEIVERS_LIST_GET_ERROR: 'receivers.list.get.error',
    RECEIVER_GET_UNKNOWN: 'receiver.get.unknown',
    RECEIVER_CREATE_ERROR: 'receiver.create.error',
    RECEIVER_NAME_CONFLICT: 'receiver.name.conflict',
    RECEIVER_CREATE_SUCCESS: 'receiver.create.success',
    RECEIVER_UPDATE_SUCCESS: 'receiver.update.success',
    RECEIVER_UPDATE_ERROR: 'receiver.update.error',
    RECEIVER_DELETE_SUCCESS: 'receiver.delete.success',
    RECEIVERR_DELETE_ERROR: 'receiver.delete.error',
    RECEIVER_GET_SUCCESS: 'receiver.get.success',

    TRANSPORT_LIST_GET_ERROR: 'transport.list.get.error',
    TRANSPORT_GET_UNKNOWN: 'transport.get.unknown',
    TRANSPORT_CREATE_ERROR: 'transport.create.error',
    TRANSPORT_NAME_CONFLICT: 'transport.name.conflict',
    TRANSPORT_CREATE_SUCCESS: 'transport.create.success',
    TRANSPORT_UPDATE_SUCCESS: 'transport.update.success',
    TRANSPORT_UPDATE_ERROR: 'transport.update.error',
    TRANSPORT_DELETE_SUCCESS: 'transport.delete.success',
    TRANSPORT_DELETE_ERROR: 'transport.delete.error',
    TRANSPORT_GET_SUCCESS: 'transport.get.success',

    TTN_LIST_GET_ERROR: 'ttn.list.get.error',
    TTN_GET_UNKNOWN: 'ttn.get.unknown',
    TTN_CREATE_ERROR: 'ttn.create.error',
    TTN_NAME_CONFLICT: 'ttn.name.conflict',
    TTN_CREATE_SUCCESS: 'ttn.create.success',
    TTN_UPDATE_SUCCESS: 'ttn.update.success',
    TTN_UPDATE_ERROR: 'ttn.update.error',
    TTN_DELETE_SUCCESS: 'ttn.delete.success',
    TTN_DELETE_ERROR: 'ttn.delete.error',
    TTN_GET_SUCCESS: 'ttn.get.success',

    GOODS_LIST_GET_ERROR: 'goods.list.get.error',
    GOODS_GET_UNKNOWN: 'goods.get.unknown',

    GOODS_STORAGE_CREATE_SUCCESS: 'goods.storage.create.success',
    GOODS_STORAGE_CREATE_ERROR: 'goods.storage.create.error',
    GOODS_STORAGE_GET_UNKNOWN: 'goods.storage.get.unknown',
    GOODS_STORAGE_UPDATE_SUCCESS: 'goods.storage.update.success',
    GOODS_STORAGE_UPDATE_ERROR: 'goods.storage.update.error',

    TRANSACTION_FAILED: 'transaction.failed',

    EMAIL_SEND_FAILED: 'email.send.failed',
};

module.exports = messageCode;
