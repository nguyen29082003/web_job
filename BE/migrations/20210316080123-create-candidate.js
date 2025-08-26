'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Candidates', {

      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id"
        },
        onDelete: 'CASCADE'
      },
      target: {
        type: Sequelize.STRING(1000)
      },
      prize: {
        type: Sequelize.STRING(1000)
      },
      certificate: {
        type: Sequelize.STRING(1000)
      },
      interest: {
        type: Sequelize.STRING(1000)
      },
      presenters: {
        type: Sequelize.STRING(500)
      },
      education: {
        type: Sequelize.STRING(1000)
      },
      experience: {
        type: Sequelize.STRING(2000)
      },
      activate: {
        type: Sequelize.STRING(5000)
      },
      project: {
        type: Sequelize.TEXT
      },
      moreInformation: {
        type: Sequelize.STRING(1000)
      },
      status: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Candidates');
  }
};