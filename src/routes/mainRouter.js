const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");

//C;
router.post("/create/box", mainController.createBox);
router.post("/create/fusion", mainController.createFusion);
router.post("/create/color", mainController.createColor);
router.post("/create/link", mainController.createLink);
/* --------------------------------------------------------------------- */
//R;
router.get("/", mainController.findBox);
router.get("/box", mainController.findBox);
router.get("/fusion", mainController.findFusion);
router.get("/color", mainController.findColor);
router.get("/link", mainController.findLink);
/* --------------------------------------------------------------------- */
//Rotas de consultas especificas e detalhadas;
router.get("/:id", mainController.findByIdBox);
router.get("/fusion/:id", mainController.findByIdFusion);
router.get("/color/:id", mainController.findByIdColor);
router.get("/link/:id", mainController.findByIdLink);
router.get("/name/:name_description", mainController.findByName);
router.get("/locale/:locale", mainController.findByLocale);
router.get("/detail/:name_description", mainController.findDetail);
/* --------------------------------------------------------------------- */
//U;
router.put("/:id", mainController.fullUpdate);
/* --------------------------------------------------------------------- */
//D;
router.delete("/:id", mainController.destroy);

module.exports = router;
