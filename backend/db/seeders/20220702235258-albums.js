'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Albums';
    return queryInterface.bulkInsert(
      options,
      [
        {
          userId: 1,
          title: 'album One',
          description: 'this is an album from a user',
          previewImage: 'image',
        },
        {
          userId: 2,
          title: 'album Two',
          description: 'this is an album from a user',
          previewImage: 'image',
        },
        {
          userId: 3,
          title: 'album Three',
          description: 'this is an album from a user',
          previewImage: 'image',
        },
        {
          userId: 1,
          title: 'album Four',
          description: 'this is an album from a user',
          previewImage: 'image',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Albums';
    return queryInterface.bulkDelete(options);
  },
};
