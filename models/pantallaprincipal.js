'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PantallaPrincipal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PantallaPrincipal.init({
    titulo1: DataTypes.STRING,
    titulo2: DataTypes.STRING,
    titulo3: DataTypes.STRING,
    titulo4: DataTypes.STRING,
    img: DataTypes.STRING,
    background: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PantallaPrincipal',
  });
  return PantallaPrincipal;
};