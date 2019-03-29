'use strict';
module.exports = (sequelize, DataTypes) => {
  const TagImage = sequelize.define('TagImage', {
    TagId: DataTypes.INTEGER,
    ImageId: DataTypes.INTEGER
  }, {});
  TagImage.associate = function(models) {
    // associations can be defined here
  };
  return TagImage;
};