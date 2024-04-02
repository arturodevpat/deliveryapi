const express = require("express");
const router = express.Router();
const {
  addproductos,
  getproductos,
  updateproductos,
  deleteproductos,
  getoneproduct,
} = require("../controllers/productos.controller.js");

// add products
router.post("/addproducts/:restaurantId", addproductos);
// get products
router.get("/getproducts/:idproduct", getproductos);
// get one product
router.get("/getoneproduct/:idproduct", getoneproduct);
// update one product
router.put("/updateproducts/:idproduct", updateproductos);
// delete one product
router.delete("/deleteproducts/:idproduct", deleteproductos);

module.exports = router;
