'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('companies', 'avatar', {
        type: Sequelize.STRING(500),
        allowNull: true,
      }),
      queryInterface.addColumn('companies', 'banner', {
        type: Sequelize.STRING(500),
        allowNull: true,
      }),
      queryInterface.addColumn('companies', 'introduce', {
        type: Sequelize.TEXT,
        allowNull: true,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn('companies', 'avatar'), queryInterface.removeColumn('companies', 'banner'), queryInterface.removeColumn('companies', 'introduce')]);
  }
};
