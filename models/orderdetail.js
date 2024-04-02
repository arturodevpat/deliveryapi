"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderDetail.belongsTo(models.Order, {
        foreignKey: "orderId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      OrderDetail.belongsTo(models.Productos, {
        foreignKey: "productosId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  OrderDetail.init(
    {
      orderId: DataTypes.INTEGER,
      productosId: DataTypes.INTEGER,
      cantidad: DataTypes.INTEGER,
      precioUnitario: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "OrderDetail",
    }
  );
  return OrderDetail;
};
