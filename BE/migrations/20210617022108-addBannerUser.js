'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('users', 'banner', {
      type: Sequelize.STRING(500),
      allowNull: true,
    }),
      queryInterface.addColumn('users', 'introduce', {
        type: Sequelize.TEXT,
        allowNull: true,
      })
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn('users', 'banner'), queryInterface.removeColumn('users', 'introduce')]);
  }
};
