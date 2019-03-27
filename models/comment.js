'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    text: DataTypes.STRING,
    ImageId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.Image)
    Comment.belongsTo(models.User)
  };
  return Comment;
};