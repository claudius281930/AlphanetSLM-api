const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainController");

// router.get("/search", mainController.pageSearch);

/* ---- Action get a object for parameter ---- */
router.get("/", mainController.findBox);
router.get("/:id", mainController.findByIdBox);
router.get("/detail/:name_description", mainController.findDetail);

/* ---- Action for create or FIND a object body page---- */
router.post("/create", mainController.createBox);
router.post("/create/fusion", mainController.createFusion);
router.post("/create/color", mainController.createColor);
router.post("/create/link", mainController.createLink);

/* ---- Action that will take the route of a specific object ---- */
router.get("/fusion", mainController.findFusion);
router.get("/color", mainController.findColor);
router.get("/link", mainController.findLink);
router.get("/fusion/:id", mainController.findByIdFusion);
router.get("/color/:id", mainController.findByIdColor);
router.get("/link/:id", mainController.findByIdLink);
router.get("/name/:name_description", mainController.findByName);
router.get("/locale/:locale", mainController.findByLocale);

/* ---- Action for update a object ---- */
router.put("/:id", mainController.fullUpdate);

/* ---- Action for delete a object ---- */
router.delete("/:id", mainController.destroy);
// router.delete("/box/:id", mainController.deleteBox);

module.exports = router;
