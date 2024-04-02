const express = require("express");
const router = express.Router();
const {
  addterminosycondiciones,
  actualizarTerminosycondiciones,
  borrarTerminosycondiciones,
  terminosycondciones,
} = require("../controllers/terminosYCondiciones.controller.js");

router.post("/addterminosycondiciones", addterminosycondiciones);
router.get("/terminosYCondiciones", terminosycondciones);
router.put("/actualizarterminosycondiciones", actualizarTerminosycondiciones);
router.delete("/eliminarterminosycondiciones", borrarTerminosycondiciones);

module.exports = router;
