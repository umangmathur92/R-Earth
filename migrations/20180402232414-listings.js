'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
        'listings',
        {
            listing_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'users',
                    key: 'user_id'
                }
            },
            title: {
                type: Sequelize.STRING
            },
            picture: {
                type: Sequelize.STRING
            },
            post_date: {
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
                type: Sequelize.INTEGER,
                references: {
                    model: 'status',
                    key: 'status_id'
                }
            },
            category: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'categories',
                    key: 'category_id'
                }
            },
            response: {
                type: Sequelize.STRING
            },
            agency: {
                type: Sequelize.STRING
            },
            response_date: {
                type: Sequelize.DATE
            }
        }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable( 'listings' );
  }
};
