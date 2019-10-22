'use strict';
module.exports = (sequelize, DataTypes) => {
  const archivedGoods = sequelize.define('archivedGoods', {
    name: DataTypes.STRING,
    volume: DataTypes.INTEGER,
    count: DataTypes.STRING,
    weight: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    recommendation: DataTypes.STRING,
    TTNId: DataTypes.INTEGER
  }, {});
  archivedGoods.associate = function(models) {
    archivedGoods.belongsTo(models.TTN, {
      foreignKey: 'TTNId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return archivedGoods;
};
