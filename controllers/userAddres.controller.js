const db = require("../models/index.js");

// obtener la direccion del usuario
const getUserAddress = async (req, res) => {
  const { id } = req.params;

  try {
    const userExist = await db.User.findOne({
      where: { id },
    });

    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }

    const data = await userExist.getAddresses();

    res.json({ message: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// añadir la direccion del usuario
const addUserAddress = async (req, res) => {
  const { id } = req.params;
  const { state, city, street, pincode, addressType } = req.body;

  try {
    if (!id || !state || !city || !street || !pincode || !addressType) {
      return res.json({ message: "Favor de llenar todos los campos" });
    }

    const userExist = await db.User.findOne({
      where: { id },
    });

    if (!userExist) {
      return res.json({ message: "User not found" });
    }

    const user = await db.Address.create({
      userId: id,
      state: state,
      city: city,
      street: street,
      pincode: pincode,
      addressType: addressType,
    });

    res.status(200).json({ message: "Dirección agregado correctamente", user });
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
};

// actualizar la dirección del usuario
const updateUserAddress = async (req, res) => {
  const { userId, idAddress } = req.params;

  const { state, city, street, pincode } = req.body;

  if (!state || !city || !street || !pincode) {
    return res
      .status(400)
      .json({ message: "Favor de proporcionar todos los campos" });
  }

  try {
    const updatedRows = await db.Address.update(
      { state, city, street, pincode },
      {
        where: {
          userId: userId,
          id: idAddress,
        },
      }
    );

    if (updatedRows[0] === 0) {
      return res
        .status(404)
        .json({ message: "No se encontró la dirección para actualizar" });
    }

    return res.status(200).json({ message: "Dirección actualizada con éxito" });
  } catch (error) {
    return res.status(500).json({ message: "Ha ocurrido un error", error });
  }
};

// borrar la direccion del usuario
const removeUserAddress = async (req, res) => {
  const { userId, idAddress } = req.params;

  // verificamos si existe la direccion

  try {
    const addressExists = await db.Address.findOne({
      where: { id: idAddress },
    });

    if (!addressExists) {
      return res
        .status(404)
        .json({ message: "no se encontró la direccion del usuario" });
    }

    await db.Address.destroy({
      where: {
        id: idAddress,
        userId: userId,
      },
    });

    res
      .status(200)
      .json({ message: "se ha borrado exitosamente la direccion" });
  } catch (error) {
    return res.json({ message: error.message });
  }
};

module.exports = {
  getUserAddress,
  addUserAddress,
  removeUserAddress,
  updateUserAddress,
};
