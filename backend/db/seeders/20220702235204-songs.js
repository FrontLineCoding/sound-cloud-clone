'use strict';

module.exports = {
   up : async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Songs', [
      {
       userId: 1,
       albumId: 1,
       title: 'Song One',
       description:'This is a song',
       url: 'audio url',
       previewImage: 'img url'
      },
      {
        userId: 1,
        albumId: 1,
        title: 'Song Two',
        description:'This is a song',
        url: 'audio url',
        previewImage: 'img url'
       },
       {
        userId: 2,
        albumId: 2,
        title: 'Song Three',
        description:'This is a song',
        url: 'audio url',
        previewImage: 'img url'
       },
       {
        userId: 2,
        albumId: 2,
        title: 'Song Four',
        description:'This is a song',
        url: 'audio url',
        previewImage: 'img url'
       },
       {
        userId: 3,
        albumId: 3,
        title: 'Song Five',
        description:'This is a song',
        url: 'audio url',
        previewImage: 'img url'
       },
       {
        userId: 3,
        albumId: 3,
        title: 'Song Six',
        description:'This is a song',
        url: 'audio url',
        previewImage: 'img url'
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
