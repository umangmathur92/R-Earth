'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
        'response',
        {
            response_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            listing_id: {
                type: Sequelize.INTEGER
            },
            user_id: {
                type: Sequelize.INTEGER
            },
            agency: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.STRING
            },
            date: {
                type: Sequelize.DATE
            },
            status: {
                type: Sequelize.STRING
            }
        }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable( 'response' );
  }
};
