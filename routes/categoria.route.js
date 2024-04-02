const express = require("express");
const {
  agregarCategoria,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
} = require("../controllers/categoria.controller");
const router = express.Router();

router.post("/agregarcategoria", agregarCategoria);
router.get("/obtenercategoria", obtenerCategoria);
router.put("/actualizarcategoria/:idcategoria", actualizarCategoria);
router.delete("/borrarcategoria/:idcategoria", borrarCategoria);

module.exports = router;
