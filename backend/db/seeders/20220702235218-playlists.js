'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Playlists';
    return queryInterface.bulkInsert(
      options,
      [
        {
          userId: 1,
          name: 'PlaylistOne',
          previewImage: 'image url',
        },
        {
          userId: 5,
          name: 'PlaylistTwo',
          previewImage: 'image url',
        },
        {
          userId: 3,
          name: 'PlaylistThree',
          previewImage: 'image url',
        },
        {
          userId: 1,
          name: 'PlaylistFour',
          previewImage: 'image url',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Playlists';
    return queryInterface.bulkDelete(options);
  },
};
