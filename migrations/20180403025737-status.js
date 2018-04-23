'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
        'status',
        {
            status_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            type: {
                type: Sequelize.STRING
            }
        }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable( 'status' );
  }
};
