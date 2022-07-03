'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('Users', [
        {
          firstName: 'Doe',
          lastName: 'peublo',
          email:'abc@email.com',
          username:'user1',
          password: 'password',
          artistId
        },
        {
          firstName: 'usertwo',
          lastName: 'userthree',
          email:'abcd@email.com',
          username:'user2',
          password: 'password',
          artistId: 1
        },
        {
          firstName: 'userthree',
          lastName: 'peublo',
          email:'abasdfac@email.com',
          username:'user3',
          password: 'password',
          artistId: 2
        },
        {
          firstName: 'userfour',
          lastName: 'peublo',
          email:'absdf@email.com',
          username:'user1',
          password: 'password',
          artistId: 3
        },
        {
          firstName: 'userfive',
          lastName: 'peublo',
          email:'hgabc@email.com',
          username:'user5',
          password: 'password',
        },
        {
          firstName: 'usersix',
          lastName: 'ohon',
          email:'argrbc@email.com',
          username:'user6',
          password: 'password',
        },
        {
          firstName: 'userseven',
          lastName: 'tehee',
          email:'ayjedbc@email.com',
          username:'user7',
          password: 'password',
        },
        {
          firstName: 'usereight',
          lastName: 'whoops',
          email:'absdgc@email.com',
          username:'user8',
          password: 'password',
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
