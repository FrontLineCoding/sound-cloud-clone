'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'playlist_songs';
    return queryInterface.bulkInsert(
      options,
      [
        {
          playlistId: 1,
          songId: 1,
        },
        {
          playlistId: 1,
          songId: 2,
        },
        {
          playlistId: 1,
          songId: 3,
        },
        {
          playlistId: 1,
          songId: 4,
        },
        {
          playlistId: 2,
          songId: 1,
        },
        {
          playlistId: 2,
          songId: 6,
        },
        {
          playlistId: 2,
          songId: 3,
        },
        {
          playlistId: 2,
          songId: 2,
        },
        {
          playlistId: 3,
          songId: 5,
        },
        {
          playlistId: 3,
          songId: 3,
        },
        {
          playlistId: 3,
          songId: 6,
        },
        {
          playlistId: 3,
          songId: 4,
        },
        {
          playlistId: 3,
          songId: 1,
        },
        {
          playlistId: 4,
          songId: 4,
        },
        {
          playlistId: 4,
          songId: 1,
        },
        {
          playlistId: 4,
          songId: 2,
        },
        {
          playlistId: 4,
          songId: 3,
        },
        {
          playlistId: 1,
          songId: 5,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'playlist_songs';
    return queryInterface.bulkDelete(options);
  },
};
