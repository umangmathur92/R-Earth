'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('status', [
        {
            status_id: 0,
            type: 'Unverified'
        },
        {
            status_id: 1,
            type: 'Acknowledged'
        },
        {
            status_id: 2,
            type: 'In Progress'
        },
        {
            status_id: 3,
            type: 'Resolved'
        }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable( 'status' );
  }
};
