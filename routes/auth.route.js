const express = require("express");
const {
  registerUser,
  signUser,
  logout,
  refreshToken,
  registerUserValidationRules,
  signUserValidator,
} = require("../controllers/auth.controller");
const router = express.Router();

router.post("/sign-up", registerUserValidationRules(), registerUser);

router.post("/sign-in", signUserValidator(), signUser);

router.post("/logout", logout);

router.post("/refresh-token", refreshToken);
module.exports = router;
