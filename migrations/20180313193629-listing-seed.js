'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert( 'listing', [
        {
            listing_id: 0,
            user_id: 1,
            title: 'Pollution at Dolores Park',
            picture: 'dolores_trash.jpg',
            date: Sequelize.literal('NOW()'),
            description: 'There is a large pile of trash that needs to be cleaned up.',
            longitude: null,
            latitude: null,
            address: '19th & Dolores St, San Francisco, CA 94114',
            zipcode: 94114,
            status: 'Reported'
        }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable( 'listing' );
  }
};
