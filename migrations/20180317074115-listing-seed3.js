'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert( 'listing', [
       {
            listing_id: 1,
            user_id: 1,
            title: 'Water Pollution at Fisherman\'s Wharf',
            picture: '/images/dolores_trash.jpg',
            date: Sequelize.literal('NOW()'),
            description: 'People have thrown trash into the water.',
            longitude: -122.4253858,
            latitude: 37.8081269,
            address: 'Beach St & The Embarcadero, San Francisco, CA 94133',
            zipcode: 94133,
            status: 'Reported'
        },
        {
            listing_id: 2,
            user_id: 1,
            title: 'Sewage Leak onto the street',
            picture: '/images/dolores_trash.jpg',
            date: Sequelize.literal('NOW()'),
            description: 'A leaking sewer pipe is causing inconvenience to the residents.',
            longitude: -122.4369025,
            latitude: 37.7633618,
            address: '2370 Market St, San Francisco, CA 94114',
            zipcode: 94114,
            status: 'Reported'
        },
        {
            listing_id: 3,
            user_id: 1,
            title: 'Garbage dump at Golden Gate Park',
            picture: '/images/dolores_trash.jpg',
            date: Sequelize.literal('NOW()'),
            description: 'Large dump of trash near the park entrance.',
            longitude: -122.4880328,
            latitude: 37.766914,
            address: '1017 Martin Luther King Jr Dr, San Francisco, CA 94122',
            zipcode: 94122,
            status: 'Reported'
        },
        {
            listing_id: 4,
            user_id: 1,
            title: 'Unhealthy air near St. Ignatius College',
            picture: '/images/dolores_trash.jpg',
            date: Sequelize.literal('NOW()'),
            description: 'Excessive smoke from a chimney is causing breathing difficulties to residents of the neighborhood',
            longitude: -122.49812,
            latitude: 37.7480737,
            address: '2001 37th Ave, San Francisco, CA 94116',
            zipcode: 94116,
            status: 'Reported'
        }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable( 'listing' );
  }
};
