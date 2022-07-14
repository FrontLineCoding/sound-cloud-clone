'use strict';

module.exports = {
   up : async (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Artists', [
        {
          username: 'JohnDoe',
          totalSongs: 2,
          totalAlbums: 1,
          userId: 1
        },
        {
          username: 'Lil J',
          totalSongs: 2,
          totalAlbums: 1,
          userId: 2
        },
        {
          username: 'HillTop',
          totalSongs: 2,
          totalAlbums: 1,
          userId: 3
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
