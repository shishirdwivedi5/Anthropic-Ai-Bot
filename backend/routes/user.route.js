const express = require("express");
const routes = express.Router();

const { userRegister, userLogin , getMe ,userLogout } = require("../controllers/user.controller");

routes.post("/register", userRegister);
routes.post("/login", userLogin);
routes.get("/me", getMe);
routes.get("/logout",userLogout) 

module.exports = routes;
