'use strict';

module.exports = {
   up : async (queryInterface, Sequelize) => {
     return  queryInterface.bulkInsert('Playlists', [
      {
       userId: 1,
       name: "PlaylistOne",
       previewImage: 'image url'
      },
      {
        userId: 5,
        name: "PlaylistTwo",
        previewImage: 'image url'
       },
       {
        userId: 3,
        name: "PlaylistThree",
        previewImage: 'image url'
       },
       {
        userId: 1,
        name: "PlaylistFour",
        previewImage: 'image url'
       }
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
