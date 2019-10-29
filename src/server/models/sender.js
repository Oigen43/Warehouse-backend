'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sender = sequelize.define('Sender', {
    senderName: DataTypes.STRING,
    upn: DataTypes.INTEGER,
    countryCode: DataTypes.STRING,
    date: DataTypes.DATE,
    deleted: DataTypes.BOOLEAN
  }, {});
  Sender.associate = function(models) {
    // associations can be defined here
  };
  return Sender;
};
