'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tag.belongsToMany(models.New, {
        through: "TagNews"
      }),
        Tag.belongsToMany(models.Candidate, {
          through: "TagCandidates"
        }),
        Tag.belongsToMany(models.Work, {
          through: "TagWorks"
        })
      Tag.belongsToMany(models.User, {
        through: "UserTags"
      }),
        Tag.belongsToMany(models.FormCV, {
          through: "TagFormCVs"
        })
    }
  };
  Tag.init({
    name: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};