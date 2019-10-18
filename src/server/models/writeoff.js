'use strict';
module.exports = (sequelize, DataTypes) => {
  const WriteOff = sequelize.define('WriteOff', {
    number: DataTypes.INTEGER,
    TTNId: DataTypes.INTEGER,
    registrationDate: DataTypes.STRING,
    controllerId: DataTypes.INTEGER
  }, {});
  WriteOff.associate = function(models) {
    // associations can be defined here
  };
  return WriteOff;
};
