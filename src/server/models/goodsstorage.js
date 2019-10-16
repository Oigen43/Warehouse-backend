'use strict';
module.exports = (sequelize, DataTypes) => {
  const GoodsStorages = sequelize.define('GoodsStorages', {
    storageId: DataTypes.INTEGER,
    goodsId: DataTypes.INTEGER,
    size: DataTypes.INTEGER
  }, {});
  GoodsStorages.associate = function(models) {
    // associations can be defined here
  };
  return GoodsStorages;
};
