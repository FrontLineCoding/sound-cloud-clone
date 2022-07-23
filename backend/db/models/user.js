'use strict';
const { Model, Validator } = require('sequelize');
const bcrypt = require('bcryptjs');


module.exports = (sequelize, DataTypes) => {

  class User extends Model {
    toSafeObject() {
      const { id, username, email } = this; // context will be the User instance
      return { id, username, email };
    }
    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }
    static async login({ email, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: email,
            email: email
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }
    static async signup({ firstName, lastName, username, email, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        hashedPassword
      });
      return await User.scope('currentUser').findByPk(user.id);
    }
    static associate(models) {
      User.hasMany(models.Playlist);
      User.hasMany(models.Comment);
      User.hasMany(models.Song, {foreignKey: 'userId'});
      User.hasMany(models.Album, {foreignKey: 'userId'});

    }
     validatePassword (password){
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
  };

  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull:false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull:false

      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          }
        }
      },
      previewImage: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 256]
        }
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      },
      isArtist : {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
        }
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] }
        },
        loginUser: {
          attributes: {}
        }
      }
    }
  );

  // function validatePassword (password){
  //   return bcrypt.compareSync(password, this.hashedPassword.toString());
  // }

  return User;
};
