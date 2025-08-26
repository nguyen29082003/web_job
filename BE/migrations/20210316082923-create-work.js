'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Works', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      companyId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Companies",
          key: "id"
        },
        onDelete: 'CASCADE'
      },
      name: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      addressGoogle: {
        type: Sequelize.STRING(1000)
      },
      email: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      request: {
        type: Sequelize.TEXT
      },
      interest: {
        type: Sequelize.TEXT
      },
      dealtime: {
        type: Sequelize.STRING
      },
      nature: {
        type: Sequelize.TEXT
      },
      exprience: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      form: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('Works');
  }
};