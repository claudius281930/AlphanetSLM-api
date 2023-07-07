const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainController");

// router.get("/search", mainController.pageSearch);

/* ---- Action get a object for parameter ---- */
router.get("/box", mainController.findBox);
//router.get("/", mainController.findBox);//Para revisão
router.get("/:id", mainController.findByIdBox);
router.get("/detail/:name_description", mainController.findDetail);//ok
// router.get("/create", mainController.pageFormCreateBox);
//router.get("/update", mainController.pageFormUpdateBox);
//router.get("/delete", mainController.pageFormDeleteBox);

/* ---- Action for create or FIND a object body page---- */
//router.post("/create/box", mainController.createBox);//ok
router.post("/create/fusion", mainController.createFusion);
router.post("/create/color", mainController.createColor);
router.post("/create/link", mainController.createLink);
// router.post("/box/name", mainController.getBoxByNameFromBody);
// router.post("/box/id", mainController.getBoxById);
// router.post("/locale", mainController.getBoxByLocaleFromBody);

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
