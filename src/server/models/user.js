'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    surname: DataTypes.STRING,
    patronymic: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    birthDate: DataTypes.STRING,
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    deleted: DataTypes.BOOLEAN,
    companyId: DataTypes.INTEGER
  }, {});
  User.associate = function(models) {
    User.belongsToMany(models.Role, {
      through: 'RoleUsers',
      as: 'roles',
      foreignKey: 'userId'
    });
  };
  return User;
};
