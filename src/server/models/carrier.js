'use strict';
module.exports = (sequelize, DataTypes) => {
  const Carrier = sequelize.define('Carrier', {
    name: DataTypes.STRING,
    upn: DataTypes.STRING,
    countryCode: DataTypes.STRING,
    date: DataTypes.DATE,
    deleted: DataTypes.BOOLEAN
  }, {});
  Carrier.associate = function(models) {
    Carrier.hasMany(models.Driver, {
      foreignKey: 'carrierId',
      as: 'drivers'
    });
    Carrier.hasMany(models.Transport, {
      foreignKey: 'carrierId',
      as: 'transport'
    });
  };
  return Carrier;
};
