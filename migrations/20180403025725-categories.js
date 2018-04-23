'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
        'categories',
        {
            category_id: {
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
    return queryInterface.dropTable( 'categories' );
  }
};
