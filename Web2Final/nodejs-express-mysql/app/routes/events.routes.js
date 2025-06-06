const express = require("express");
const router = express.Router();
const events = require("../controllers/events.controller.js");

// Routes for Events
router.get("/", events.getAllEvents); // Fetch all events
router.get("/team/:teamId", events.getTeamEvents); // Fetch events for a specific team
router.post("/", events.addEvent); // Add a new event
router.put("/:id", events.updateEvent); // Update an event
router.delete("/:id", events.deleteEvent); // Delete an event

module.exports = router;
