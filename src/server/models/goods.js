'use strict';
module.exports = (sequelize, DataTypes) => {
  const Goods = sequelize.define('Goods', {
    name: DataTypes.STRING,
    volume: DataTypes.STRING,
    count: DataTypes.STRING,
    weight: DataTypes.STRING,
    price: DataTypes.STRING,
    recommendation: DataTypes.STRING,
    TTNId: DataTypes.INTEGER
  }, {});
  Goods.associate = function(models) {
    Goods.belongsTo(models.TTN, {
      foreignKey: 'TTNId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return Goods;
};
