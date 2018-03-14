'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
        {
            user_id: 0,
            name: 'Administrator',
            username: 'admin',
            password: 'team1',
            user_type: null,
            active: null,
            agency: null
        },
        {
            user_id: 1,
            name: 'John Doe',
            username: 'john',
            password: 'doe',
            user_type: 0,
            active: 0,
            agency: null
        }
    ]);
},

down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable( 'users' );
}
};
