const Event = require("../models/events.model.js");

// Fetch all events
exports.getAllEvents = (req, res) => {
  Event.getAll((err, results) => {
    if (err) {
      console.error("Error fetching events:", err);
      res.status(500).send({ message: "Error fetching events." });
      return;
    }
    res.send(results);
  });
};

// Fetch events for a specific team
exports.getTeamEvents = (req, res) => {
  const teamId = req.params.teamId;
  Event.getByTeamId(teamId, (err, results) => {
    if (err) {
      console.error("Error fetching team events:", err);
      res.status(500).send({ message: "Error fetching team events." });
      return;
    }
    res.send(results);
  });
};

// Add a new event
exports.addEvent = (req, res) => {
  const newEvent = {
    event_name: req.body.event_name,
    event_description: req.body.event_description,
    date: req.body.date,
    location: req.body.location,
    team_id: req.body.team_id,
  };

  Event.create(newEvent, (err, result) => {
    if (err) {
      console.error("Error adding event:", err);
      res.status(500).send({ message: "Error adding event." });
      return;
    }
    res.send(result);
  });
};

// Update an event
exports.updateEvent = (req, res) => {
  const updatedEvent = {
    event_name: req.body.event_name,
    event_description: req.body.event_description,
    date: req.body.date,
    location: req.body.location,
    team_id: req.body.team_id,
  };

  Event.updateById(req.params.id, updatedEvent, (err, result) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: "Event not found." });
      } else {
        console.error("Error updating event:", err);
        res.status(500).send({ message: "Error updating event." });
      }
      return;
    }
    res.send(result);
  });
};

// Delete an event
exports.deleteEvent = (req, res) => {
  Event.remove(req.params.id, (err, result) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: "Event not found." });
      } else {
        console.error("Error deleting event:", err);
        res.status(500).send({ message: "Error deleting event." });
      }
      return;
    }
    res.send({ message: "Event deleted successfully." });
  });
};
