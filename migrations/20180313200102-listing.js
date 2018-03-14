'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
        'listing',
        {
            listing_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: {
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING
            },
            picture: {
                type: Sequelize.STRING
            },
            date: {
                type: Sequelize.DATE
            },
            description: {
                type: Sequelize.STRING
            },
            longitude: {
                type: Sequelize.NUMERIC
            },
            latitude: {
                type: Sequelize.NUMERIC
            },
            address: {
                type: Sequelize.STRING
            },
            zipcode: {
                type: Sequelize.STRING
            },
            status: {
                type: Sequelize.STRING
            }
        }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable( 'listing' );
  }
};
