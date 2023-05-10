const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainController");

//C;
router.post("/create", mainController.create);
//R;
router.get("/", mainController.findAll);
router.get("/:id", mainController.findById);
//router.get("/:name_description/",mainController.findLike);// funcionou perfeitamente. Precisei muda 
//U;
router.put("/:id", mainController.update);
router.patch("/:id", mainController.partialUpdate);
//D;
router.delete("/:id", mainController.destroy);

module.exports = router;