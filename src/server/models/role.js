'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    title: DataTypes.STRING
  }, {});
  Role.associate = function(models) {
    Role.belongsToMany(models.User, {
      through: 'RoleUsers',
      as: 'users',
      foreignKey: 'roleId'
    });
  };
  return Role;
};
