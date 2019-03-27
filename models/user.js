'use strict';
const Op = require('sequelize').Op
const  encrypt  = require('../helper/encrypt')
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          arg: true,
          msg: `Please Input First Name`
        }
      }
    },
    lastname: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          arg: true,
          msg: `Please Input Last Name`
        }
      }
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          arg: true,
          msg: `Please Input Username`
        },
        isUnique(username) {
          return User.findOne({
              where: {
                email: username,
                id: {
                  [Op.ne]: this.id
                }
              }
            })
            .then(foundUsername => {
              if (foundUsername) {
                throw new Error(`Duplicate Email!`)
              }
            })
        }
      }
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          arg: true,
          msg: `Please Input Email`
        },
        isUnique(value) {
          return User.findOne({
              where: {
                email: value,
                id: {
                  [Op.ne]: this.id
                }
              }
            })
            .then(foundEmail => {
              if (foundEmail) {
                throw new Error(`Duplicate Email!`)
              }
            })
        }
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          arg: true,
          msg: `Please Input Password`
        }
      }
    },
    birthdate: {
      allowNull: false,
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          arg: true,
          msg: `Please Input Birthdate`
        }
      }
    },
    gender: {
      allowNull: false,
      type: DataTypes.ENUM('Male', 'Female'),
      validate: {
        notEmpty: {
          arg: true,
          msg: `Please Input Gender`
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: function(value, option){
        //RE-FORMAT DETAILS
        value.password = encrypt(value.password)
        value.firstname = value.firstname[0].toUpperCase() + value.firstname.slice(1).toLowerCase()
        value.lastname = value.lastname[0].toUpperCase() + value.lastname.slice(1).toLowerCase()
        value.email = value.email.toLowerCase()
      }
    }
  });
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Image)
  };

  User.prototype.checkLogin = function(pass){
    return User.findByPk(this.id)
      .then( foundUser => {
     return bcrypt.compareSync(pass, this.password)
      })
  }
  return User;
};