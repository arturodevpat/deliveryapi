"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Productos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Productos.belongsTo(models.Restaurant, {
        foreignKey: "restaurantId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      Productos.belongsToMany(models.Order, {
        through: "OrderDetail",
        foreignKey: "productosId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Productos.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      precio: DataTypes.DECIMAL,
      imagen: DataTypes.STRING,
      restaurantId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Productos",
    }
  );
  return Productos;
};
