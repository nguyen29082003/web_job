'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TagFormCV extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TagFormCV.belongsTo(models.Tag, {
        foreignKey: "tagId",
        targetKey: "id"
      });
      TagFormCV.belongsTo(models.FormCV, {
        foreignKey: "formCVId",
        targetKey: "id"
      })
    }
  };
  TagFormCV.init({
    tagId: DataTypes.INTEGER,
    formCVId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TagFormCV',
  });
  return TagFormCV;
};