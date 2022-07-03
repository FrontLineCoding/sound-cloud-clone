'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('People', [
      {
       artistId: 1,
       albumId: 1,
       title: 'Song One',
       description:'This is a song',
       url: 'audio url',
       previewImg: 'img url'
      },
      {
        artistId: 1,
        albumId: 1,
        title: 'Song Two',
        description:'This is a song',
        url: 'audio url',
        previewImg: 'img url'
       },
       {
        artistId: 2,
        albumId: 2,
        title: 'Song Three',
        description:'This is a song',
        url: 'audio url',
        previewImg: 'img url'
       },
       {
        artistId: 2,
        albumId: 2,
        title: 'Song Four',
        description:'This is a song',
        url: 'audio url',
        previewImg: 'img url'
       },
       {
        artistId: 3,
        albumId: 3,
        title: 'Song Five',
        description:'This is a song',
        url: 'audio url',
        previewImg: 'img url'
       },
       {
        artistId: 3,
        albumId: 3,
        title: 'Song Six',
        description:'This is a song',
        url: 'audio url',
        previewImg: 'img url'
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