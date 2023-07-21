const express = require("express");
const router = express.Router();
const path = require("path");
//const { eAdmin } = require(path.join(__dirname, "../middlewares/auth"));

const userController = require("../controllers/userController");

//Exibe os usuarios. Postman;
router.get("/users", /*eAdmin,*/ userController.findUsers);
router.get("/user/:id", /*auth,*/ userController.findByIdUser);
router.get("/user/name/:name", /*auth,*/ userController.findUserName);
//Processa os dados para efetuar o login;
router.post("/login", userController.processLogin);

module.exports = router;
