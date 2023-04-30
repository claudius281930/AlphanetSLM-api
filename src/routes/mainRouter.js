const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainController");

//C;
router.post("/create", mainController.create);
//R;
router.get("/", mainController.findAll);
//router.get("/:nome",mainController.findByName);
router.get("/:id", mainController.findById);
//U;
router.put("/:id", mainController.update);
router.patch("/:id", mainController.parcial);
//D;
router.delete("/:id", mainController.destroy);

module.exports = router;