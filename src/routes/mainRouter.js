const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainController");
const { eUser } = require("../middlewares/logMiddlaware");

/* ---- Exhibition pages for users ---- */
router.get("/search", eUser, mainController.pageSearch);
router.get("/box//create", eUser, mainController.pageFormCreateBox);
router.get("/box//update", eUser, mainController.pageFormUpdateBox);
router.get("/box//delete", eUser, mainController.pageFormDeleteBox);

/* ---- Action get HTTPS: GET ---- */
router.get("/box", eUser, mainController.findBox);
router.get("/fusion", eUser, mainController.findFusion);
router.get("/color", eUser, mainController.findColor);
router.get("/link", eUser, mainController.findLink);
/* ---- Action get a object for parameter ---- */
router.get("/box/:id", eUser, mainController.findByIdBox);
router.get("/fusion/:id", eUser, mainController.findByIdFusion);
router.get("/color/:id", eUser, mainController.findByIdColor);
router.get("/link/:id", eUser, mainController.findByIdLink);
router.get("/box/name/:name_description", eUser, mainController.findByName);
router.get("/box/locale/:locale", eUser, mainController.findByLocale);
router.get("/box/net/:networkTechnology", eUser, mainController.findByNetworkTechnology);
router.get("/box/detail/:name_description", eUser, mainController.findDetail);
/* ---- Action for create or FIND a object body page HTTPS: POST ---- */
router.post("/box/create", eUser, mainController.createBox);
router.post("/fusion/create", eUser, mainController.createFusion);
router.post("/color/create", eUser, mainController.createColor);
router.post("/link/create", eUser, mainController.createLink);
/* ---- Action for update a object HTTPS: PUT ---- */
router.put("/box/update/:id", eUser, mainController.fullUpdate);
/* ---- Action for delete a object HTTPS: DELETE ---- */
router.delete("/box/delete/:id", eUser, mainController.destroy);

module.exports = router;
