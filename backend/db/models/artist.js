'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Artist.belongsTo(models.User, {onDelete: 'CASCADE'});
      Artist.hasMany(models.Song, {foreignKey: 'userId'});
      Artist.hasMany(models.Album, {foreignKey: 'artistId'});
    }
  }
  Artist.init({
    userId: {
      type: DataTypes.INTEGER,
    },
    totalSongs: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    totalAlbums: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    previewImage: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Artist',
  });
  return Artist;
};
