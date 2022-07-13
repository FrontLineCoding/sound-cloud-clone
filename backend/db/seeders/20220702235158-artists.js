'use strict';

module.exports = {
   up : async (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Artists', [
        {
          username: 'JohnDoe',
          totalSongs: 2,
          totalAlbums: 1
        },
        {
          username: 'LilJ',
          totalSongs: 2,
          totalAlbums: 1
        },
        {
          username: 'HillTop',
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
