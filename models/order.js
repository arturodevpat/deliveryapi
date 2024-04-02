"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Order.belongsTo(models.Restaurant, {
        foreignKey: "restaurantId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Order.belongsTo(models.Driver, {
        foreignKey: "driverId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Order.belongsTo(models.Productos, {
        through: "OrderDetail",
        foreignKey: "orderId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Order.init(
    {
      userId: DataTypes.INTEGER,
      restaurantId: DataTypes.INTEGER,
      driverId: DataTypes.INTEGER,
      order_total: DataTypes.STRING,
      delivery_status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
