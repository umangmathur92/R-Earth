'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
        'users',
        {
            user_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING
            },
            username: {
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING
            },
            user_type: {
                type: Sequelize.INTEGER
            },
            active: {
                type: Sequelize.INTEGER
            },
            agency: {
                type: Sequelize.STRING
            }
        }
    );
},

down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable( 'users' );
}
};
