'use strict';
module.exports = (sequelize, DataTypes) => {
  const Driver = sequelize.define('Driver', {
    firstName: DataTypes.STRING,
    surname: DataTypes.STRING,
    passportNumber: DataTypes.STRING,
    issuingDate: DataTypes.STRING,
    deleted: DataTypes.BOOLEAN,
    carrierId: DataTypes.INTEGER
  }, {});
  Driver.associate = function(models) {
    Driver.belongsTo(models.Carrier, {
      foreignKey: 'carrierId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return Driver;
};
