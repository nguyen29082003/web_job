'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SaveWork extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  SaveWork.init({
    userId: DataTypes.INTEGER,
    workId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SaveWork',
  });
  return SaveWork;
};