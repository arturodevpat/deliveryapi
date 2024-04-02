const db = require("../models/index.js");

const obtenerInformacionCategoria = async (req, res) => {
  const { idcategoria } = req.params;

  // Validamos si la categoría existe
  const categoriaExiste = await db.Categoria.findOne({
    where: { id: idcategoria },
  });

  if (!categoriaExiste) {
    return res.status(404).json({ error: "La categoría no existe" });
  }

  try {
    const productosMasBaratos = await obtenerProductosMasBaratos(idcategoria);
    const RecientementeAgregados = await obtenerProductosRecientementeAgregados(
      idcategoria
    );
    const nuevosProductos = await descubreNuevosProductos(idcategoria);

    res.json({
      categoria: categoriaExiste,
      productosMasBaratos,
      RecientementeAgregados,
      nuevosProductos,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error interno del servidor", message: error.message });
  }
};
/*
const obtenerProductosMasBaratos = async (idCategoria) => {
  try {
    const restaurantesCategoria = await db.Restaurant.findAll({
      where: { categoriaId: idCategoria },
    });

    const restaurantIds = restaurantesCategoria.map(
      (restaurante) => restaurante.id
    );

    const productosRelacionados = await db.Productos.findAll({
      where: { restaurantId: restaurantIds },
    });

    const productosMasBaratos = productosRelacionados.filter(
      (productos) => productos.precio <= 80
    );

    productosMasBaratos.sort((a, b) => a.precio - b.precio);

    return productosMasBaratos;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
};
*/

const obtenerProductosMasBaratos = async (idCategoria) => {
  try {
    const productosMasBaratos = await db.Productos.findAll({
      include: {
        model: db.Restaurant,
        where: { categoriaId: idCategoria },
      },
      where: { precio: { [db.Sequelize.Op.lte]: 80 } },
      order: [["precio", "ASC"]],
      limit: 10,
    });

    return productosMasBaratos;
  } catch (error) {
    console.error("Error al obtener productos:", error);
  }
};

const obtenerProductosRecientementeAgregados = async (idCategoria) => {
  const fechaActual = new Date();
  const fechaLimite = new Date(fechaActual.getTime() - 5 * 24 * 60 * 60 * 1000);

  const recientementeAnadidos = await db.Productos.findAll({
    include: {
      model: db.Restaurant,
      where: { categoriaId: idCategoria },
    },
    where: {
      createdAt: { [db.Sequelize.Op.between]: [fechaLimite, fechaActual] },
    },
    order: [["precio", "ASC"]],
    limit: 10,
  });

  return recientementeAnadidos;
};

const descubreNuevosProductos = async (idCategoria) => {
  try {
    const productos = await db.Productos.findAll({
      include: {
        model: db.Restaurant,
        where: { categoriaId: idCategoria },
      },
      where: {
        precio: { [db.Sequelize.Op.between]: [50, 200] },
      },
      order: db.Sequelize.literal("RANDOM()"), // Orden aleatorio
      limit: 5,
    });

    return productos;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
};

module.exports = { obtenerInformacionCategoria };
