'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WorkTypeOfWork extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      WorkTypeOfWork.belongsTo(models.Work, {
        foreignKey: "workId",
        targetKey: "id"
      })
    }
  };
  WorkTypeOfWork.init({
    typeofworkId: {
      type: DataTypes.INTEGER,
      references: {
        model: "TypeOfWork",
        key: "id"
      }
    },
    workId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Work",
        key: "id"
      }
    },
  }, {
    sequelize,
    modelName: 'WorkTypeOfWork',
  });
  return WorkTypeOfWork;
};