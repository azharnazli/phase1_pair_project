'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    path: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {});
  Image.associate = function(models) {
    // associations can be defined here
    Image.belongsTo(models.User)
  };
  return Image;
};