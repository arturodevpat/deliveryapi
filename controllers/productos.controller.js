const db = require("../models/index.js");

const addproductos = async (req, res) => {
  const { name, description, precio, imagen } = req.body;

  if (!name || !description || !precio || !imagen)
    return res.status(400).send("todos los campos deben ser proporcionados");

  try {
    const newProducto = await db.Productos.create({
      name,
      description,
      precio,
      imagen,
      restaurantId: req.params.restaurantId,
    });
    res.status(201).json(newProducto);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      error: error.message,
    });
  }
};

const getproductos = async (req, res) => {
  const { idproduct } = req.params;

  try {
    const restaurantExists = await db.Restaurant.findOne({
      where: { id: idproduct },
    });

    if (!restaurantExists) {
      return res.status(404).json({ message: "restaurante no encontrado" });
    }

    const data = await restaurantExists.getProductos();

    res.status(200).json({ message: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getoneproduct = async (req, res) => {
  const { idproduct } = req.params;

  try {
    const productsexist = await db.Productos.findOne({
      where: { id: idproduct },
    });
    res.json({ productsexist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateproductos = async (req, res) => {
  const { idproduct } = req.params;

  const { name, description, precio, imagen } = req.body;

  if (!name || !description || !precio || !imagen)
    return res.status(400).send("todos los campos deben ser proporcionados");

  try {
    const productsexist = await db.Productos.findOne({ id: idproduct });

    if (!productsexist) {
      return res.status(404).json({ message: "producto no encontrado" });
    }

    await productsexist.update(
      { name, description, precio, imagen },
      { where: { id: idproduct } }
    );

    res.status(200).json({ message: "producto actualizado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteproductos = async (req, res) => {
  const { idproduct } = req.params;

  try {
    const productsexist = await db.Productos.findOne({ id: idproduct });

    if (!productsexist) {
      return res.status(404).json({ message: "producto no encontrado" });
    }

    await productsexist.destroy({ where: { id: idproduct } });

    res.status(200).json({ message: "producto borrado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  addproductos,
  getproductos,
  getoneproduct,
  updateproductos,
  deleteproductos,
};
