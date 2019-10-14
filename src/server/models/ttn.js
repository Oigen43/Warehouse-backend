'use strict';
module.exports = (sequelize, DataTypes) => {
  const TTN = sequelize.define('TTN', {
    number: DataTypes.INTEGER,
    registrationDate: DataTypes.DATE,
    type: DataTypes.STRING,
    status: DataTypes.STRING,
    carrier: DataTypes.STRING,
    sender_receiver: DataTypes.STRING,
    deleted: DataTypes.BOOLEAN
  }, {});
  TTN.associate = function(models) {
    // associations can be defined here
  };
  return TTN;
};
