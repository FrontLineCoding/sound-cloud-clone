'use strict';

module.exports = {
   up : async (queryInterface, Sequelize) => {
     return  queryInterface.bulkInsert('Playlists', [
      {
       userId: 1,
       name: "PlaylistOne"
      },
      {
        userId: 5,
        name: "PlaylistTwo"
       },
       {
        userId: 3,
        name: "PlaylistThree"
       },
       {
        userId: 1,
        name: "PlaylistFour"
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
