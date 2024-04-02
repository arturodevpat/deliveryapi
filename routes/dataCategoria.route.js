//* rutas para la informacion en la home
const express = require("express");
const {
  obtenerInformacionCategoria,
} = require("../controllers/dataCategoria.controller");

const router = express.Router();

// Ruta para obtener toda la información relacionada con una categoría
router.get("/categoria/:idcategoria/informacion", obtenerInformacionCategoria);

module.exports = router;
