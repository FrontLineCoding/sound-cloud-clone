'use strict';

module.exports = {
   up : async (queryInterface, Sequelize) => {
     return queryInterface.bulkInsert('Albums', [
      {
        artistId: 1,
        title: "Playlist One",
        description:"this is a playlist from a user",
        previewImg: "image"
      },
      {
        artistId: 2,
        title: "Playlist Two",
        description:"this is a playlist from a user",
        previewImg: "image"
      },
      {
        artistId: 3,
        title: "Playlist Three",
        description:"this is a playlist from a user",
        previewImg: "image"
      },
      {
        artistId: 1,
        title: "Playlist Four",
        description:"this is a playlist from a user",
        previewImg: "image"
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
