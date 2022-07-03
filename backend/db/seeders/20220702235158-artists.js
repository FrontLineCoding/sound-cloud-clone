'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('People', [
        {
          userName: 'John Doe',
          totalSongs: 2,
          totalAlbums: 1
        },
        {
          userName: 'Lil J',
          totalSongs: 2,
          totalAlbums: 1
        },
        {
          userName: 'HillTop',
          totalSongs: 2,
          totalAlbums: 1
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
