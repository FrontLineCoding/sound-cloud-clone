'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('People', [
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

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
