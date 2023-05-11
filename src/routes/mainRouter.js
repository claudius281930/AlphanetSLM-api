const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainController");

//C;
router.post("/create", mainController.create);

//R;
router.get("/", mainController.findAll);
router.get("/detail/:name_description", mainController.findDetail);
router.get("/:id", mainController.findById);
router.get("/name/:name_description",mainController.findByName); 
router.get('/locale/:locale', mainController.findByLocale);

//U;
router.put("/:id", mainController.update);
router.patch("/:id", mainController.partialUpdate);

//D;
router.delete("/:id", mainController.destroy);

module.exports = router;