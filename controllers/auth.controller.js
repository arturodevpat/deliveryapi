const db = require("../models/index.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createToken, verifyExpiration } = db.authToken;
const { body, validationResult } = require("express-validator");
//  body("password").isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
const registerUserValidationRules = () => {
  return [
    body("email").isEmail().withMessage("Correo electrónico no válido"),
    body("password")
      .isStrongPassword({
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1,
      })
      .withMessage(
        "la contraseña debe tener al menos 6 caracteres, una letra minuscula, una letra mayuscula y un simbolo"
      ),
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("lastname").notEmpty().withMessage("El apellido es requerido"),
    body("phoneNumber")
      .notEmpty()
      .withMessage("El número de teléfono es requerido"),
    body("birthdayDate")
      .notEmpty()
      .withMessage("La fecha de nacimiento es requerida"),
    body("gender").notEmpty().withMessage("El género es requerido"),
  ];
};

const signUserValidator = () => {
  return [
    body("email")
      .isEmail()
      .withMessage("usuario o contraseña incorrectos, express validator email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage(
        "usuario o contraseña incorrectos, express validator password"
      ),
  ];
};

const registerUser = async (req, res) => {
  const { name, lastname, email, password, phoneNumber, birthdayDate, gender } =
    req.body;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ errors: errorMessages });
    }

    const userExists = await db.User.findOne({
      where: { email },
    });

    const phoneExists = await db.User.findOne({
      where: { phoneNumber },
    });

    if (phoneExists) {
      return res.status(500).json({
        message: "telefon o correo ya esta asociado con otra cuenta ",
      });
    }
    if (userExists) {
      return res.status(400).json({
        message: "telefono o correo ya esta asociado con otra cuenta",
      });
    }

    await db.User.create({
      name,
      lastname,
      email,
      password: await bcrypt.hash(password, 15),
      phoneNumber,
      birthdayDate,
      gender,
    });
    return res.status(200).json({ message: "Usuario creado correctamente" });
  } catch (err) {
    return res.status(500).json({ message: "error al crear el usuario", err });
  }
};
/*
const signUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(200).json({ message: "correo no encontrado" });
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return res
        .status(404)
        .json({ message: "correo o contraseña incorrecto" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("access_token", token, {
      httpOnly: true,
    });

    let refreshToken = await createToken(user);

    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken: token,
      refreshToken,
    });
  } catch (err) {
    res.json({ message: err.message });
  }
};
*/
const signUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ errors: errorMessages });
    }

    const user = await db.User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "correo no encontrado" });
    }

    const passwordValid = await bcrypt.compare(password, user.password);

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
  } catch (err) {
    res.json({ message: err.message });
  }
};

const logout = async (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "se ha cerrado la sesion" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;
  if (requestToken == null) {
    return res.status(403).json({ message: "refresh token es requerido" });
  }

  try {
    let refreshToken = await db.authToken.findOne({
      where: { token: requestToken },
    });

    if (!refreshToken) {
      res.status(403).json({ message: "refresh token invalido" });
      return;
    }

    if (verifyExpiration(refreshToken)) {
      db.authToken.destroy({ where: { id: refreshToken.id } });
      res.status(403).json({
        message: "refresh token ya expiro. por favor inicia sesion nuevamente",
      });
      return;
    }

    const user = await db.User.findOne({
      where: { id: refreshToken.user },
      attributes: {
        exclude: ["password"],
      },
    });

    let newAccessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRATION,
    });

    res.cookie("access_token", newAccessToken, {
      httpOnly: true,
    });

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({ message: "error interno del server" });
  }
};

module.exports = {
  registerUser,
  signUser,
  refreshToken,
  logout,
  registerUserValidationRules,
  signUserValidator,
};
