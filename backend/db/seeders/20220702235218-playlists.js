'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('People', [
      {
       userId: 1,
       name: "PlaylistOne",
       previewImg: "image"
      },
      {
        userId: 5,
        name: "PlaylistTwo",
        previewImg: "image"
       },
       {
        userId: 3,
        name: "PlaylistThree",
        previewImg: "image"
       },
       {
        userId: 1,
        name: "PlaylistFour",
        previewImg: "image"
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
