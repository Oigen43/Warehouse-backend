'use strict';
module.exports = (sequelize, DataTypes) => {
  const Goods = sequelize.define('Goods', {
    name: DataTypes.STRING,
    size: DataTypes.INTEGER,
    storageType: DataTypes.STRING
  }, {});
  Goods.associate = function(models) {
    Goods.belongsToMany(models.Storage, {
      through: 'GoodsStorages',
      as: 'storages',
      foreignKey: 'goodsId'
    });
  };
  return Goods;
};
