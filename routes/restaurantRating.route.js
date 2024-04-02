const express = require("express");
const router = express.Router();
const {
  ratingRestaurant,
  addRatingRestaurant,
} = require("../controllers/restaurantRating.controller");

router.get(
  "/getrestaurantrating/:restaurantId/calificaciones",
  ratingRestaurant
);
router.post(
  "/addratingrestaurant/:restaurantId/calificar",
  addRatingRestaurant
);

module.exports = router;
