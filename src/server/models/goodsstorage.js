'use strict';
module.exports = (sequelize, DataTypes) => {
  const GoodsStorage = sequelize.define('GoodsStorage', {
    storageId: DataTypes.INTEGER,
    goodsId: DataTypes.INTEGER,
    size: DataTypes.INTEGER
  }, {});
  GoodsStorage.associate = function(models) {
    // associations can be defined here
  };
  return GoodsStorage;
};
