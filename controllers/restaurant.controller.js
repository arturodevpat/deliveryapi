const db = require("../models/index.js");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createToken, verifyExpiration } = db.authToken;

const registerResturantValidation = () => {
  return [
    // validaciones

    body("name")
      .notEmpty()
      .isString()
      .withMessage("proporciona un nombre")
      .custom((value) => {
        // Busca el nombre en la base de datos
        return db.Restaurant.findOne({ where: { name: value } }).then(
          (restaurant) => {
            // Si existe, lanza un error
            if (restaurant) {
              throw new Error("el nombre ya existe");
            }
            // Si no existe, devuelve true
            return true;
          }
        );
      }),
    body("description")
      .notEmpty()
      .isString()
      .withMessage("proprociona una description"),
    body("address")
      .notEmpty()
      .isString()
      .withMessage("proporciona una direccion"),
    body("email")
      .isEmail()
      .notEmpty()
      .withMessage("email invalido")
      .custom((value) => {
        // Busca el email en la base de datos
        return db.Restaurant.findOne({ where: { email: value } }).then(
          (restaurant) => {
            // Si existe, lanza un error
            if (restaurant) {
              throw new Error("el email ya existe");
            }
            // Si no existe, devuelve true
            return true;
          }
        );
      }),
    body("password")
      .notEmpty()
      .withMessage(
        "la contraseña debe tener al menos 6 caracteres, una letra minuscula, una letra mayuscula y un simbolo"
      ),
    body("phone")
      .notEmpty()
      .withMessage("favor de proporciona un numero valido")
      .custom((value) => {
        // Busca el teléfono en la base de datos
        return db.Restaurant.findOne({ where: { phone: value } }).then(
          (restaurant) => {
            // Si existe, lanza un error
            if (restaurant) {
              throw new Error("el teléfono ya existe");
            }
            // Si no existe, devuelve true
            return true;
          }
        );
      }),
    body("categoriaId")
      .notEmpty()
      .isNumeric()
      .withMessage("categoria debe ser proporcionada"),
  ];
};

const registerRestaurant = async (req, res) => {
  const { name, description, address, email, password, phone, categoriaId } =
    req.body;

  //* validate that the category exists

  const categoryExists = await db.Categoria.findByPk(categoriaId);

  if (!categoryExists) {
    return res.status(500).send("la categoria no existe");
  }

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ errors: errorMessages });
    }

    const data = await db.Restaurant.create({
      name,
      description,
      address,
      email,
      password: await bcrypt.hash(password, 15),
      phone,
      categoriaId,
    });

    res.json({ message: "usuario creado correctamente", data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const loginRestaurant = async (req, res) => {
  const { email, password } = req.body;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ errors: errorMessages });
    }

    const user = await db.Restaurant.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(200).json({ message: "correo no encontrado" });
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    console.log(passwordValid);
    if (!passwordValid) {
      return res
        .status(404)
        .json({ message: "correo o contraseña incorrecto" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    let refreshToken = await createToken(user);

    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken: token,
      refreshToken,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerRestaurant,
  loginRestaurant,
  registerResturantValidation,
};
