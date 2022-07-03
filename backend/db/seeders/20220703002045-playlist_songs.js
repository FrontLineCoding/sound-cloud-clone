'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('People', [
      {
        playlistId: 1,
        songId: 1
      },
      {
        playlistId: 1,
        songId: 2
      },
      {
        playlistId: 1,
        songId: 3
      },
      {
        playlistId: 1,
        songId: 4
      },
      {
        playlistId: 2,
        songId: 1
      },
      {
        playlistId: 2,
        songId: 6
      },
      {
        playlistId: 2,
        songId: 3
      },
      {
        playlistId: 2,
        songId: 2
      },
      {
        playlistId: 2,
        songId: 1
      },
      {
        playlistId: 3,
        songId: 5
      },
      {
        playlistId: 3,
        songId: 3
      },
      {
        playlistId: 3,
        songId: 6
      },
      {
        playlistId: 3,
        songId: 4
      },
      {
        playlistId: 3,
        songId: 1
      },
      {
        playlistId: 4,
        songId: 4
      },
      {
        playlistId: 4,
        songId: 1
      },
      {
        playlistId: 4,
        songId: 2
      },
      {
        playlistId: 4,
        songId: 3
      },
      {
        playlistId: 1,
        songId: 5
      }
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
