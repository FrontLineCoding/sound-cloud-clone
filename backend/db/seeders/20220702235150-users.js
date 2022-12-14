'use strict';
const bcrypt = require('bcryptjs');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(
      options,
      [
        {
          firstName: 'userone',
          lastName: 'peublo',
          email: 'useremailone@email.com',
          username: 'user1workbaby',
          hashedPassword: bcrypt.hashSync('password1'),
          isArtist: true,
          previewImage: 'imageURL',
        },
        {
          firstName: 'usertwo',
          lastName: 'whocares',
          email: 'usertwoemail@email.com',
          username: 'user2',
          hashedPassword: bcrypt.hashSync('password2'),
          isArtist: true,
          previewImage: 'imageURL',
        },
        {
          firstName: 'userthree',
          lastName: 'nomansland',
          email: 'userthreeemail@email.com',
          username: 'user3',
          hashedPassword: bcrypt.hashSync('password3'),
          isArtist: true,
          previewImage: 'imageURL',
        },
        {
          firstName: 'userfour',
          lastName: 'jubilee',
          email: 'userfouremail@email.com',
          username: 'user1',
          hashedPassword: bcrypt.hashSync('password4'),
        },
        {
          firstName: 'userfive',
          lastName: 'sweetTaters',
          email: 'userfiveemail@email.com',
          username: 'user5',
          hashedPassword: bcrypt.hashSync('password5'),
        },
        {
          firstName: 'usersix',
          lastName: 'ohonss',
          email: 'usersixemail@email.com',
          username: 'user6',
          hashedPassword: bcrypt.hashSync('password6'),
        },
        {
          firstName: 'userseven',
          lastName: 'tehesse',
          email: 'usersevenemail@email.com',
          username: 'user7',
          hashedPassword: bcrypt.hashSync('password7'),
        },
        {
          firstName: 'usereight',
          lastName: 'whoops',
          email: 'usereightemail@email.com',
          username: 'user8',
          hashedPassword: bcrypt.hashSync('password8'),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkDelete(options);
  },
};
