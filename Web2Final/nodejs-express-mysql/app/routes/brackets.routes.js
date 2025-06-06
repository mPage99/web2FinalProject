const express = require("express");
const router = express.Router();
const BracketController = require("../controllers/brackets.controller");

router.get("/", BracketController.getAllBrackets);
router.post("/", BracketController.createBracket);
router.put("/:id", BracketController.updateBracket);
router.delete("/:id", BracketController.deleteBracket);

module.exports = router;
