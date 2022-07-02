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
      Artist.hasMany(models.Song, {foreignKey: 'artistId'});
      Artist.hasMany(models.Album, {foreignKey: 'artistId'});
    }
  }
  Artist.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    totalSongs: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    totalAlbums: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    previewImg: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Artist',
  });
  return Artist;
};
