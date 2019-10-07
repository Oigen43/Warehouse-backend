'use strict';
module.exports = (sequelize, DataTypes) => {
  const Carrier = sequelize.define('Carrier', {
    name: DataTypes.STRING,
    unp: DataTypes.STRING,
    countryCode: DataTypes.STRING,
    date: DataTypes.DATE,
    deleted: DataTypes.BOOLEAN
  }, {});
  Carrier.associate = function(models) {
    // associations can be defined here
  };
  return Carrier;
};
