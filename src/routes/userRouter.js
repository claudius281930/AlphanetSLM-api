const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/", userController.findUser);
router.post("/create", userController.createUser);// /register/create

module.exports = router;