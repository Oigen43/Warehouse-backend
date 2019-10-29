'use strict';
module.exports = (sequelize, DataTypes) => {
    const Goods = sequelize.define('Goods', {
        name: DataTypes.STRING,
        volume: DataTypes.INTEGER,
        count: DataTypes.STRING,
        weight: DataTypes.INTEGER,
        price: DataTypes.STRING,
        recommendation: DataTypes.STRING,
        TTNId: DataTypes.INTEGER
    }, {});
    Goods.associate = function (models) {
        Goods.belongsTo(models.TTN, {
            foreignKey: 'TTNId',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        Goods.belongsToMany(models.Storage, {
            through: 'GoodsStorage',
            as: 'storage',
            foreignKey: 'goodsId'
        });
    };
    return Goods;
};
