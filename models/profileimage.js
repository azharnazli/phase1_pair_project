'use strict';
module.exports = (sequelize, DataTypes) => {
  const profileImage = sequelize.define('profileImage', {
    path: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {});
  profileImage.associate = function(models) {
    // associations can be defined here
    profileImage.belongsTo(models.User)
  };
  return profileImage;
};