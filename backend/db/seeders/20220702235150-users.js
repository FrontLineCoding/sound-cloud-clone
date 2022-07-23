'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
    up: async  (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Users', [
        {
          firstName: 'userone',
          lastName: 'peublo',
          email:'useremailone@email.com',
          username:'user1workbaby',
          hashedPassword: bcrypt.hashSync('password1'),
          isArtist: true,
          previewImage: 'imageURL'
        },
        {
          firstName: 'usertwo',
          lastName: 'whocares',
          email:'usertwoemail@email.com',
          username:'user2',
          hashedPassword: bcrypt.hashSync('password2'),
          isArtist: true,
          previewImage: 'imageURL'
        },
        {
          firstName: 'userthree',
          lastName: 'nomansland',
          email:'userthreeemail@email.com',
          username:'user3',
          hashedPassword: bcrypt.hashSync('password3'),
          isArtist: true,
          previewImage: 'imageURL'
        },
        {
          firstName: 'userfour',
          lastName: 'jubilee',
          email:'userfouremail@email.com',
          username:'user1',
          hashedPassword: bcrypt.hashSync('password4')
        },
        {
          firstName: 'userfive',
          lastName: 'sweetTaters',
          email:'userfiveemail@email.com',
          username:'user5',
          hashedPassword: bcrypt.hashSync('password5'),
        },
        {
          firstName: 'usersix',
          lastName: 'ohonss',
          email:'usersixemail@email.com',
          username:'user6',
          hashedPassword: bcrypt.hashSync('password6'),
        },
        {
          firstName: 'userseven',
          lastName: 'tehesse',
          email:'usersevenemail@email.com',
          username:'user7',
          hashedPassword: bcrypt.hashSync('password7'),
        },
        {
          firstName: 'usereight',
          lastName: 'whoops',
          email:'usereightemail@email.com',
          username:'user8',
          hashedPassword: bcrypt.hashSync('password8'),
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
