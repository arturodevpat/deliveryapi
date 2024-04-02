"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Restaurant.hasMany(models.Order, {
        foreignKey: "restaurantId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Restaurant.belongsTo(models.Categoria, {
        foreignKey: "categoriaId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Restaurant.hasMany(models.Productos, {
        foreignKey: "restaurantId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Restaurant.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      address: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      entrega: DataTypes.STRING,
      envio: DataTypes.STRING,
      perfil_url: DataTypes.STRING,
      cover_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Restaurant",
    }
  );
  return Restaurant;
};
