'use strict';

module.exports = {
   up : async (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Artists', [
        {
          userId: 1,
          totalSongs: 2,
          totalAlbums: 1
        },
        {
          userId: 2,
          totalSongs: 2,
          totalAlbums: 1
        },
        {
          userId: 3,
          totalSongs: 2,
          totalAlbums: 1
        },
    ], {});
  },

   down : async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return;
  }
};
