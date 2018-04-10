'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('status', [
        {
            status_id: 0,
            type: 'Reported'
            //red
        },
        {
            status_id: 1,
            type: 'Acknowledged'
            //red
        },
        {
            status_id: 2,
            type: 'Work in Progress'
            //blue
        },
        {
            status_id: 3,
            type: 'Resolved'
            //
        }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable( 'status' );
  }
};
