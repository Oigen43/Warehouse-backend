'use strict';
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    companyName: DataTypes.STRING,
    address: DataTypes.STRING,
    description: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    date: DataTypes.DATE,
    deleted: DataTypes.BOOLEAN
  }, {});
  Company.associate = function(models) {
    // associations can be defined here
    Company.hasMany(models.Warehouse, {
      foreignKey: 'companyId',
      as: 'warehouses'
    });
  };
  return Company;
};
