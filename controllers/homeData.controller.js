const db = require("../models/index");

const homeInformation = async (req, res) => {
  try {
    // Obtener datos de la base de datos
    const categorias = await db.Categoria.findAll();

    // Obtener el rango de valores posibles para los números aleatorios
    const idsCategorias = categorias.map((categoria) => categoria.id);

    const minId = Math.min(...idsCategorias);
    const maxId = Math.max(...idsCategorias);
    // Generar un número aleatorio que no sea ni mayor ni menor a los existentes
    const numeroAleatorio =
      Math.floor(Math.random() * (maxId - minId + 1)) + minId;

    // Validar si la categoría existe
    const categoriaExiste = await db.Categoria.findOne({
      where: { id: numeroAleatorio },
    });

    if (!categoriaExiste) {
      return res.status(404).json({ error: "La categoría no existe" });
    }

    // Obtener información relacionada con el número aleatorio generado

    const productosMasBaratos = await obtenerProductosMasBaratos(
      numeroAleatorio
    );

    const RecientementeAgregados = await obtenerProductosRecientementeAgregados(
      numeroAleatorio
    );
    const nuevosProductos = await descubreNuevosProductos(numeroAleatorio);

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
const obtenerProductosMasBaratos = async (numeroAleatorio) => {
  try {
    const restaurantesCategoria = await db.Restaurant.findAll({
      where: { categoriaId: numeroAleatorio },
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

const obtenerProductosMasBaratos = async (numeroAleatorio) => {
  try {
    const productosMasBaratos = await db.Productos.findAll({
      include: {
        model: db.Restaurant,
        where: { categoriaId: numeroAleatorio },
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

const obtenerProductosRecientementeAgregados = async (numeroAleatorio) => {
  const fechaActual = new Date();
  const fechaLimite = new Date(fechaActual.getTime() - 5 * 24 * 60 * 60 * 1000);

  const recientementeAnadidos = await db.Productos.findAll({
    include: {
      model: db.Restaurant,
      where: { categoriaId: numeroAleatorio },
    },
    where: {
      createdAt: { [db.Sequelize.Op.between]: [fechaLimite, fechaActual] },
    },
    order: [["precio", "ASC"]],
    limit: 10,
  });

  return recientementeAnadidos;
};

const descubreNuevosProductos = async (numeroAleatorio) => {
  try {
    const productos = await db.Productos.findAll({
      include: {
        model: db.Restaurant,
        where: { categoriaId: numeroAleatorio },
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

module.exports = { homeInformation };
