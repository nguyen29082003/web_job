'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('formCVs', 'name', {
      type: Sequelize.STRING,
      allowNull: true,
    })
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn('formCVs', 'name')]);
  }
};
