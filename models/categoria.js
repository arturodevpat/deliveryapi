"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Categoria.hasMany(models.Restaurant, {
        foreignKey: "categoriaId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Categoria.init(
    {
      image_url: DataTypes.STRING,
      nombre: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Categoria",
    }
  );
  return Categoria;
};
