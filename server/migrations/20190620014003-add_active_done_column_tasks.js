'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        /*
         Add altering commands here.
         Return a promise to correctly handle asynchronicity.

         Example:
         return queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        return Promise.all([
            queryInterface.addColumn(
                'Tasks',
                'active', //flag to store if task is active or deleted
                {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: true
                }
            ),

            queryInterface.addColumn(
                'Tasks',
                'done', //flag to store if task is done or in-progress
                {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false
                }
            )
        ]);

    },

    down: (queryInterface, Sequelize) => {
        /*
         Add reverting commands here.
         Return a promise to correctly handle asynchronicity.

         Example:
         return queryInterface.dropTable('users');
         */
        return Promise.all([
            queryInterface.removeColumn('Tasks', 'active'),
            queryInterface.removeColumn('Tasks', 'done')
        ]);
    }
};
