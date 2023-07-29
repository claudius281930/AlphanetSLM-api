const express = require("express");
const router = express.Router();
const path = require("path");
const { eUser } = require("../middlewares/logMiddlaware");

const userController = require(path.join(__dirname,"../controllers/userController"));

//Exibe os usuarios. Postman;
router.get("/users", /*eUser,*/ userController.findUsers);
router.get("/user/:id", /*eUser,*/ userController.findByIdUser);
router.get("/user/name/:name", /*eUser,*/ userController.findUserName);

router.post("/login", userController.processLogin);

module.exports = router;
