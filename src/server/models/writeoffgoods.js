'use strict';
module.exports = (sequelize, DataTypes) => {
  const WriteOffGoods = sequelize.define('WriteOffGoods', {
    name: DataTypes.STRING,
    originVolume: DataTypes.STRING,
    currentVolume: DataTypes.STRING,
    originCount: DataTypes.STRING,
    currentCount: DataTypes.STRING,
    originWeight: DataTypes.STRING,
    currentWeight: DataTypes.STRING,
    originPrice: DataTypes.STRING,
    currentPrice: DataTypes.STRING,
    status: DataTypes.STRING,
    writeOffId: DataTypes.INTEGER,
    TTNId: DataTypes.INTEGER
  }, {});
  WriteOffGoods.associate = function(models) {
    // associations can be defined here
  };
  return WriteOffGoods;
};
