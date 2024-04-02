const db = require("../models/index");
const bcrypt = require("bcryptjs");

const fetchRestaurantData = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await db.Restaurant.findOne({
      where: { id },
    });
    res.json({ user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// actualizar usuario

const profileRestaurantUpdate = async (req, res) => {
  const {
    name,
    description,
    address,
    email,
    password,
    phone,
    entrega,
    envio,
    perfil_url,
    cover_url,
  } = req.body;

  if (
    !name ||
    !description ||
    !address ||
    !email ||
    !password ||
    !phone ||
    !entrega ||
    !envio ||
    !perfil_url ||
    !cover_url
  ) {
    return res
      .status(400)
      .json({ error: "Todos los campos son obligatorios." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ error: "El formato del correo electrónico no es válido." });
  }

  const phoneRegex = /^\+\d{10,}$/;
  if (!phoneRegex.test(phone)) {
    return res
      .status(400)
      .json({ error: "El formato del número de teléfono no es válido." });
  }

  try {
    const emailExists = await db.Restaurant.findOne({ where: { email } });

    if (emailExists) {
      return res
        .status(400)
        .json({ error: "El correo electrónico ya está en uso." });
    }

    const phoneExists = await db.Restaurant.findOne({ where: { phone } });

    if (phoneExists) {
      return res.status(400).json({ error: "el telefono ya esta en uso" });
    }

    const nameExist = await db.Restaurant.findOne({ where: { name } });

    if (nameExist) {
      return res.status(400).json({ error: "el usuario ya existe" });
    }

    const updatedRestaurant = await db.Restaurant.update(
      {
        name,
        description,
        address,
        email,
        password: await bcrypt.hash(password, 15),
        phone,
        entrega,
        envio,
        perfil_url,
        cover_url,
      },
      {
        where: {
          id: req.user.id,
        },
      }
    );

    // Enviar respuesta con el restaurante actualizado
    res.json(updatedRestaurant);
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ error: "ha ocurrido un error interno del servidor" });
  }
};

const profileRestaurantDelete = async (req, res) => {
  try {
    const userDelete = await db.Restaurant.findOne({
      where: { id: req.params.id },
    });

    if (userDelete.id !== req.user.id) {
      return res.json({ message: "no autorizado" });
    }

    await db.Restaurant.destroy({ where: { id: userDelete.id } });
    res.status(200).json({ message: "Se ha eliminado con exito la cuenta" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getallrestaurants = async (req, res) => {
  try {
    const restaurants = await db.Restaurant.findAll();
    res.json(restaurants);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  profileRestaurantUpdate,
  fetchRestaurantData,
  profileRestaurantDelete,
  getallrestaurants,
};
