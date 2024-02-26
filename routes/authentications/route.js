const express = require("express");
const Router = express.Router();
const {
  RegisterUser,
  LoginUserFromEmail,
  LoginUserFromPhone,
  GetUser,
} = require("../../controllers/authControllers");
const {
  authenticateTokenAndFindUser,
} = require("../../middalware/authMiddalWare");

Router.post("/register", RegisterUser);
Router.post("/login/email", LoginUserFromEmail);
Router.post("/login/phone", LoginUserFromPhone);
Router.get("/auth", authenticateTokenAndFindUser, GetUser);

module.exports = Router;
