const express = require("express");
const router = express.Router();
const {
  registerRestaurant,
  loginRestaurant,
  registerResturantValidation,
} = require("../controllers/restaurant.controller.js");

// ruta para que se registren los restaurants
router.post(
  "/registerRestaurant",
  registerResturantValidation(),
  registerRestaurant
);

// ruta para que inicien sesion los restaurantes
router.post("/loginRestaurant", loginRestaurant);

module.exports = router;
