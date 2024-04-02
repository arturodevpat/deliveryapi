const express = require("express");
const { homeInformation } = require("../controllers/homeData.controller");
const router = express.Router();

router.get("/homedata", homeInformation);

module.exports = router;
