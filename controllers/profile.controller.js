const db = require("../models/index");
const bcrypt = require("bcryptjs");

// debolver la informacion del usuario
/*
const fetchUserData = async (req, res) => {
  const user = await db.User.findOne({
    where: { id: req.user.id },
    attributes: {
      exclude: ["password"],
    },
  });
  res.json({ user });
};
*/

const fetchUserData = async (req, res) => {
  try {
    const user = await db.User.findOne({
      where: { id: req.user.id },
    });
    res.json({ user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// actualizar el perfil

const updateProfile = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    lastname,
    email,
    password,
    phoneNumber,
    birthdayDate,
    gender,
    profileUrl,
  } = req.body;

  if (id != req.user.id) {
    return res.json({ error: "No puedes actualizar este usuario" });
  }

  if (
    !name ||
    !lastname ||
    !email ||
    !password ||
    !phoneNumber ||
    !birthdayDate ||
    !gender ||
    profileUrl === undefined
  ) {
    return res.json({ message: "Todos los campos deben ser válidos" });
  }

  const user = await db.User.findOne({
    where: { id: id },
  });

  if (!user) return res.json({ message: "Usuario no encontrado" });

  // Verificar si el correo electrónico ya está asociado con otra cuenta
  if (email !== user.email) {
    const userExists = await db.User.findOne({
      where: { email: email },
    });

    if (userExists) {
      return res.status(400).json({
        message: "El correo ya está asociado con otra cuenta",
      });
    }
  }

  // Verificar si el teléfono ya está asociado con otra cuenta
  if (phoneNumber !== user.phoneNumber) {
    const phoneExists = await db.User.findOne({
      where: { phoneNumber: phoneNumber },
    });

    if (phoneExists) {
      return res.status(400).json({
        message: "El teléfono ya está asociado con otra cuenta",
      });
    }
  }

  try {
    const updateUser = await db.User.update(
      {
        name,
        lastname,
        email,
        password: await bcrypt.hash(password, 15),
        phoneNumber,
        birthdayDate,
        gender,
        profileUrl,
      },
      { where: { id: id } }
    );

    res.status(200).json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    return res.json({ message: "Ocurrió un error", error });
  }
};

// borrar el perfil

const deleteProfile = async (req, res) => {
  try {
    const userDelete = await db.User.findOne({
      where: { id: req.params.id },
    });

    if (userDelete.id !== req.user.id) {
      return res.json({ message: "no autorizado" });
    }

    await db.User.destroy({ where: { id: userDelete.id } });
    res.status(200).json({ message: "Se ha eliminado con exito la cuenta" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  fetchUserData,
  updateProfile,
  deleteProfile,
};
