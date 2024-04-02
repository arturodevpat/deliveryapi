// obtener la instancia de los modelos
const { where } = require("sequelize");
const db = require("../models/index.js");

// obtener todos los registro de la base de datos
const getMainScreenData = async (req, res) => {
  const info = await db.PantallaPrincipal.findAll();
  res.status(200).json({ info: info });
};

// añadir un registro a la base de datos

const addMainScreenData = async (req, res) => {
  const { titulo1, titulo2, titulo3, titulo4, img, background } = req.body;

  console.log(titulo1, titulo2, titulo3, titulo4, img, background);

  if (!titulo1 || !titulo2 || !titulo3 || !titulo4 || !img || !background) {
    return res.status(500).json({ message: "todos los campos son necesarios" });
  }

  try {
    const data = await db.PantallaPrincipal.create({
      titulo1,
      titulo2,
      titulo3,
      titulo4,
      img,
      background,
    });

    res
      .status(200)
      .json({ message: "informacion registrado correctamente", data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "ha ocurrido un error", error: error.message });
  }
};

// actualizar un dato
const updateMainScreen = async (req, res) => {
  const { id } = req.params;
  const { titulo1, titulo2, titulo3, titulo4, img, background } = req.body;

  try {
    const data = await db.PantallaPrincipal.findOne({ where: { id } });

    if (!data) {
      return res
        .status(404)
        .json({ message: "no se encontro el registro", data });
    }

    const dataUpdate = await db.PantallaPrincipal.update(
      { titulo1, titulo2, titulo3, titulo4, img, background },
      { where: { id } }
    );

    res
      .status(200)
      .json({ message: "se ha actualizado correctamente", dataUpdate });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "ha ocurrido un error", error: error.message });
  }
};

// obtener un dato en concreto de la base de datos

const getOneDataMainScreen = async (req, res) => {
  const { id } = req.params;

  const data = await db.PantallaPrincipal.findByPk(id);

  res.json({ info: data });
};

const deleteOneDataMainScreen = async (req, res) => {
  const { id } = req.params;
  const data = await db.PantallaPrincipal.destroy({
    where: { id: id },
  });

  if (!data) {
    return res.json({ message: "no se ha encontrado el registro" });
  }

  res.json({ message: "registro borrado correctamente" });
};

module.exports = {
  getMainScreenData,
  addMainScreenData,
  updateMainScreen,
  getOneDataMainScreen,
  deleteOneDataMainScreen,
};
