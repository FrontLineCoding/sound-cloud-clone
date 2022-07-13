'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Song.belongsToMany(models.Playlist, {through: models.playlist_song});
      Song.belongsTo(models.Artist);
      Song.belongsTo(models.Album);
    }
  }
  Song.init({
    artistId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    albumId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    previewImg: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};
