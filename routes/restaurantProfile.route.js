const express = require("express");
const router = express.Router();
const {
  profileRestaurantUpdate,
  fetchRestaurantData,
  profileRestaurantDelete,
  getallrestaurants,
} = require("../controllers/restaurantProfile.controller");
const { verifyToken } = require("../middleware/auth.middleware.js");

// obtener el perfil del restaurant
router.get("/restaurantProfile/:id", fetchRestaurantData);

// actualizar perfil restaurante
router.put("/restaurantProfile/:id", verifyToken, profileRestaurantUpdate);

// eliminar perfil restaurante
router.delete("/restaurantProfile/:id", verifyToken, profileRestaurantDelete);

// obtener todos los restaurants
router.get("/allrestaurants", getallrestaurants);

module.exports = router;
