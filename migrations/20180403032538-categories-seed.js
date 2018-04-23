'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categories', [
        {
            category_id: 0,
            type: 'Land'
        },
        {
            category_id: 1,
            type: 'Water'
        },
        {
            category_id: 2,
            type: 'Air'
        },
        {
            category_id: 3,
            type: 'Fire'
        }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable( 'categories' );
  }
};
