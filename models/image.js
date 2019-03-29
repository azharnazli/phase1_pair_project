'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    path: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {});
  Image.associate = function(models) {
    // associations can be defined here
    Image.belongsToMany(models.Tag, {through : models.TagImage})
    Image.belongsTo(models.User)
    Image.hasMany(models.Comment)
  };
  return Image;
};