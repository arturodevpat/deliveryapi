const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth.middleware.js");

const {
  getUserAddress,
  addUserAddress,
  removeUserAddress,
  updateUserAddress,
} = require("../controllers/userAddres.controller.js");

// obtener las direcciones de un usuario
router.get("/getUserAddress/:id", getUserAddress);

// añadir la dirección de un usuario
router.post("/addUserAddress/:id", addUserAddress);

// actualizar las direcciones de un usuario
router.put("/updateUserAddress/:userId/address/:idAddress", updateUserAddress);

// elimar las direcciones de un usuario
router.delete(
  "/deleteUserAddress/:userId/address/:idAddress",
  removeUserAddress
);

module.exports = router;
