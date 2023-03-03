const express = require("express");
const router = express.Router();

const saucesController = require("../controllers/sauces.controller");

const saucesAuth = require("../middleware/Auth");
const saucesMulter = require("../middleware/multer");


/* Déclaration des routes */
router.get("/", saucesAuth, saucesController.getAllSauces);
router.get("/:id", saucesAuth, saucesController.getOneSauce);
router.post("/", saucesAuth, saucesMulter, saucesController.createSauce);
router.put('/:id', saucesAuth, saucesMulter, saucesController.modifySauce);
router.delete('/:id', saucesAuth, saucesController.deleteSauce);
router.post("/:id/like", saucesAuth, saucesController.likeDislikeSauce);

module.exports = router;