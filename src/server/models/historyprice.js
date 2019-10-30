'use strict';
module.exports = (sequelize, DataTypes) => {
  const HistoryPrice = sequelize.define('HistoryPrice', {
    companyId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    startDate: DataTypes.DATEONLY,
    endDate: DataTypes.DATEONLY
  }, {});
  HistoryPrice.associate = function(models) {
    HistoryPrice.belongsTo(models.Company, {
      foreignKey: 'companyId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return HistoryPrice;
};
