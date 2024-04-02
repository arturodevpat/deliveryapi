const db = require("../models/index");
const { Op } = require("sequelize");

// funcion para busqueda global en la aplicacion

const busquedaGlobal = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;
    const orderBy = req.query.orderBy || "ASC";
    const orderName = req.query.orderName || "name";
    console.log(searchTerm);
    const products = await db.Productos.findAll({
      where: {
        name: { [Op.iLike]: `%${searchTerm}%` },
      },
      order: [[orderName, orderBy]],
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar productos" });
  }
};

// funcion para busqueda en un restaurante
const busquedaRestaurante = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;
    const restaurantId = req.query.restaurantId;
    const orderBy = req.query.orderBy || "ASC";
    const orderName = req.query.orderName || "name";

    const products = await db.Productos.findAll({
      where: {
        name: { [Op.iLike]: `%${searchTerm}%` },
      },
      include: [
        {
          model: db.Restaurant,
          where: { id: restaurantId },
          required: true,
        },
      ],
      order: [[orderName, orderBy]],
    });

    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al buscar productos en el restaurante" });
  }
};

module.exports = { busquedaGlobal, busquedaRestaurante };
