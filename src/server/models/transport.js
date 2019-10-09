'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transport = sequelize.define('Transport', {
    transportType: DataTypes.STRING,
    transportNumber: DataTypes.STRING,
    carrierId: DataTypes.INTEGER,
    carrierName: DataTypes.STRING,
    date: DataTypes.DATE,
    deleted: DataTypes.BOOLEAN
  }, {});
  Transport.associate = function(models) {
    Transport.belongsTo(models.Carrier, {
      foreignKey: 'carrierId'
    });
  };
  return Transport;
};
