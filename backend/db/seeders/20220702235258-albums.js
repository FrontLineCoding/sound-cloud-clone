'use strict';

module.exports = {
   up : async (queryInterface, Sequelize) => {
     return queryInterface.bulkInsert('Albums', [
      {
        userId: 1,
        title: "album One",
        description:"this is an album from a user",
        previewImage: "image"
      },
      {
        userId: 2,
        title: "album Two",
        description:"this is an album from a user",
        previewImage: "image"
      },
      {
        userId: 3,
        title: "album Three",
        description:"this is an album from a user",
        previewImage: "image"
      },
      {
        userId: 1,
        title: "album Four",
        description:"this is an album from a user",
        previewImage: "image"
      },
    ], {});
  },

   down : async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */return;
  }
};
