const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");
const { eUser } = require("../middlewares/logMiddlaware");


/* ---- Exhibition of pages for users ---- */
router.get("/search", eUser, mainController.pageSearch);
router.get("/box//create", eUser, mainController.pageFormCreateBox);
router.get("/box//update", eUser, mainController.pageFormUpdateBox);
router.get("/box//delete", eUser, mainController.pageFormDeleteBox);

/* ---- Action for GET an object ---- */
router.get("/box", /*eUser,*/ mainController.findBox);
router.get("/box/id/:id", eUser, mainController.findByIdBox);
router.get("/box/name/:name_description", eUser, mainController.findByName);
router.get("/box/locale/:locale", eUser, mainController.findByLocale);
router.get("/box/net/:networkTechnology", eUser, mainController.findByNetworkTechnology);
router.get("/box/detail/:name_description", eUser, mainController.findDetailBox);

/* ---- Action for CREATE a object ---- */
router.post("/box/create", eUser, mainController.createBox);

/* ---- Action for UPDATE totally  an object ---- */
router.put("/box/update/:id", eUser, mainController.fullUpdate);

/* ---- Action for DELETE an object HTTPS: DELETE ---- */
router.delete("/box/delete/:id", eUser, mainController.destroy);

module.exports = router;
