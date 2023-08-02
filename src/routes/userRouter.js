const express = require("express");
const router = express.Router();
const { eUser } = require("../middlewares/logMiddlaware");

const userController = require("../controllers/userController");

//Exibe os usuarios. Postman;
router.get("/users", eUser, userController.findUsers);
router.get("/user/:id", eUser, userController.findByIdUser);
router.get("/user/name/:name", eUser, userController.findUserName);

//Processa os dados para efetuar o login;
router.post("/login", userController.processLogin);
//Autoriza a exibição da pagina do Perfil pelo Front-End;
router.post("/profile", eUser, userController.profile);

module.exports = router;
