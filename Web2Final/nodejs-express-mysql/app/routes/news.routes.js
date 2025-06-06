const express = require("express");
const router = express.Router();
const NewsController = require("../controllers/news.controller");

// Fetch all news articles
router.get("/", NewsController.getAllNews);

// Create a news article
router.post("/", NewsController.createNews);

// Update a news article by ID
router.put("/:id", NewsController.updateNews);

// Delete a news article by ID
router.delete("/:id", NewsController.deleteNews);

module.exports = router;
