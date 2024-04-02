const db = require("../models/index.js");

const addterminosycondiciones = async (req, res) => {
  const { content } = req.body;
  try {
    const newTermsAndConditions = await db.Terminosycondiciones.create({
      content,
    });
    res.status(201).json(newTermsAndConditions);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      error: "Hubo un error al añadir nuevos términos y condiciones.",
    });
  }
};

const terminosycondciones = async (req, res) => {
  try {
    const termsAndConditions = await db.Terminosycondiciones.findAll();
    res.status(200).json(termsAndConditions);
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ error: "hubo un error al obtener los terminos y condiciones." });
  }
};

const actualizarTerminosycondiciones = async (req, res) => {
  const { content } = req.body;

  try {
    const termsAndConditions = await db.Terminosycondiciones.findOne();
    if (!termsAndConditions) {
      return res
        .status(404)
        .json({ error: "No se encontraron términos y condiciones." });
    }
    // Actualizar los términos y condiciones con los datos del cuerpo de la solicitud
    await termsAndConditions.update({ content });
    res.json(termsAndConditions);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Hubo un error al actualizar los términos y condiciones.",
    });
  }
};

const borrarTerminosycondiciones = async (req, res) => {
  try {
    const termsAndConditions = await db.Terminosycondiciones.findOne();
    if (!termsAndConditions) {
      return res
        .status(404)
        .json({ error: "No se encontraron términos y condiciones." });
    }
    // Eliminar los términos y condiciones
    await termsAndConditions.destroy();
    res.json({ message: "Términos y condiciones eliminados correctamente." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Hubo un error al eliminar los términos y condiciones." });
  }
};

module.exports = {
  addterminosycondiciones,
  actualizarTerminosycondiciones,
  borrarTerminosycondiciones,
  terminosycondciones,
};
