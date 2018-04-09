'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert( 'listings', [
        {
            listing_id: 0,
            user_id: 1,
            title: 'Pollution at Dolores Park',
            picture: '/images/dolores_trash.jpg',
            post_date: Sequelize.literal('NOW()'),
            description: 'There is a large pile of trash that needs to be cleaned up.',
            longitude: -122.4280626,
            latitude: 37.7598369,
            address: '19th & Dolores St, San Francisco, CA 94114',
            zipcode: 94114,
            status: 0,
            category: 0,
            response: null,
            agency: null,
            response_date: null
        },
        {
            listing_id: 1,
            user_id: 1,
            title: 'Water Pollution at Fisherman\'s Wharf',
            picture: '/images/fman_wharf.jpg',
            post_date: Sequelize.literal('NOW()'),
            description: 'People have thrown trash into the water.',
            longitude: -122.4253858,
            latitude: 37.8081269,
            address: 'Beach St & The Embarcadero, San Francisco, CA 94133',
            zipcode: 94133,
            status: 0,
            category: 1,
            response: null,
            agency: null,
            response_date: null
        },
        {
            listing_id: 2,
            user_id: 1,
            title: 'Sewage Leak onto the street',
            picture: '/images/sewage.jpg',
            post_date: Sequelize.literal('NOW()'),
            description: 'A leaking sewer pipe is causing inconvenience to the residents.',
            longitude: -122.4369025,
            latitude: 37.7633618,
            address: '2370 Market St, San Francisco, CA 94114',
            zipcode: 94114,
            status: 0,
            category: 0,
            response: null,
            agency: null,
            response_date: null
        },
        {
            listing_id: 3,
            user_id: 1,
            title: 'Garbage dump at Golden Gate Park',
            picture: '/images/golden_gate.jpg',
            post_date: Sequelize.literal('NOW()'),
            description: 'Large dump of trash near the park entrance.',
            longitude: -122.4880328,
            latitude: 37.766914,
            address: '1017 Martin Luther King Jr Dr, San Francisco, CA 94122',
            zipcode: 94122,
            status: 0,
            category: 0,
            response: null,
            agency: null,
            response_date: null
        },
        {
            listing_id: 4,
            user_id: 1,
            title: 'Unhealthy air near St. Ignatius College',
            picture: '/images/air_pollution.jpg',
            post_date: Sequelize.literal('NOW()'),
            description: 'Excessive smoke from a chimney is causing breathing difficulties to residents of the neighborhood',
            longitude: -122.49812,
            latitude: 37.7480737,
            address: '2001 37th Ave, San Francisco, CA 94116',
            zipcode: 94116,
            status: 0,
            category: 2,
            response: null,
            agency: null,
            response_date: null
        }
    ]);
},


down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable( 'listings' );
}
};
