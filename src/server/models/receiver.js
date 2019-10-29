'use strict';
module.exports = (sequelize, DataTypes) => {
  const Receiver = sequelize.define('Receiver', {
    receiverName: DataTypes.STRING,
    upn: DataTypes.INTEGER,
    countryCode: DataTypes.STRING,
    date: DataTypes.DATE,
    deleted: DataTypes.BOOLEAN
  }, {});
  Receiver.associate = function(models) {
    // associations can be defined here
  };
  return Receiver;
};
