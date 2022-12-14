'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Comments';
    return queryInterface.bulkInsert(
      options,
      [
        {
          userId: 1,
          songId: 6,
          body: 'This is a comment!',
        },
        {
          userId: 1,
          songId: 3,
          body: 'This is a comment!',
        },
        {
          userId: 1,
          songId: 5,
          body: 'This is a comment!',
        },
        {
          userId: 2,
          songId: 4,
          body: 'This is a comment!',
        },
        {
          userId: 2,
          songId: 3,
          body: 'This is a comment!',
        },
        {
          userId: 3,
          songId: 2,
          body: 'This is a comment!',
        },
        {
          userId: 3,
          songId: 1,
          body: 'This is a comment!',
        },
        {
          userId: 3,
          songId: 1,
          body: 'This is a comment!',
        },
        {
          userId: 4,
          songId: 2,
          body: 'This is a comment!',
        },
        {
          userId: 5,
          songId: 3,
          body: 'This is a comment!',
        },
        {
          userId: 6,
          songId: 4,
          body: 'This is a comment!',
        },
        {
          userId: 7,
          songId: 5,
          body: 'This is a comment!',
        },
        {
          userId: 8,
          songId: 6,
          body: 'This is a comment!',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Comments';
    return queryInterface.bulkDelete(options);
  },
};
