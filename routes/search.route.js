const express = require("express");
const router = express.Router();
const {
  busquedaGlobal,
  busquedaRestaurante,
} = require("../controllers/search.controller");

// Para la busqueda global
router.get("/searchGlobal", busquedaGlobal);

// Para la busqueda de productos en un restaurant
router.get("/searchRestaurante", busquedaRestaurante);

module.exports = router;
