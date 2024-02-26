const express = require("express");
const Router = express.Router();
const contactUser = require("../../controllers/contactControllers");

Router.post("/contact", contactUser);

module.exports = Router;
