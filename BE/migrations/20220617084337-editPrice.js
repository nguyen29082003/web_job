'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('works', 'price1', {
        type: Sequelize.INTEGER,
        allowNull: true
      }),
      queryInterface.addColumn('works', 'price2', {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn('works', 'price1'), queryInterface.removeColumn('works', 'price2')]);
  }
};
