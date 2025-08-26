'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('WorkTypeOfWorks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      typeofworkId: {
        type: Sequelize.INTEGER,
        references: {
          model: "TypeOfWorks",
          key: "id"
        },
        onDelete: 'CASCADE'
      },
      workId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Works",
          key: "id"
        },
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('WorkTypeOfWorks');
  }
};