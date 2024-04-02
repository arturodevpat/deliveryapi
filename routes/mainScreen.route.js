const express = require("express");
const router = express.Router();
const {
  getMainScreenData,
  addMainScreenData,
  getOneDataMainScreen,
  deleteOneDataMainScreen,
  updateMainScreen,
} = require("../controllers/mainScreen.controller.js");

// para obtener todos los titulos e imagenes
router.get("/getAllmainScreen", getMainScreenData);

// añadir nuevos titulos
router.post("/addMainScreenData", addMainScreenData);

// para obtener un unico registro
router.get("/getMainScreen/:id", getOneDataMainScreen);

// para actualizar un registro

router.put("/updateMainScreen/:id", updateMainScreen);

// para borrar un registro
router.delete("/deleteMainScreen/:id", deleteOneDataMainScreen);

module.exports = router;
