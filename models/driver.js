"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Driver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Driver.hasMany(models.Order, {
        foreignKey: "driverId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Driver.init(
    {
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      location: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Driver",
    }
  );
  return Driver;
};
