const db = require("./db.js"); // Database connection

// Event constructor
const Event = function (event) {
  this.event_name = event.event_name;
  this.event_description = event.event_description;
  this.date = event.date;
  this.location = event.location;
  this.team_id = event.team_id;
};

// Fetch all events
Event.getAll = (result) => {
  const query = "SELECT * FROM events";
  db.query(query, (err, res) => {
    if (err) {
      console.error("Error fetching events:", err);
      result(err, null);
      return;
    }
    console.log("Events fetched:", res);
    result(null, res);
  });
};

// Fetch events for a specific team
Event.getByTeamId = (teamId, result) => {
  const query = "SELECT * FROM events WHERE team_id = ?";
  db.query(query, [teamId], (err, res) => {
    if (err) {
      console.error("Error fetching team events:", err);
      result(err, null);
      return;
    }
    console.log(`Events for team ${teamId} fetched:`, res);
    result(null, res);
  });
};

// Add a new event
Event.create = (newEvent, result) => {
  const query = "INSERT INTO events SET ?";
  db.query(query, newEvent, (err, res) => {
    if (err) {
      console.error("Error adding event:", err);
      result(err, null);
      return;
    }
    console.log("Event added:", { id: res.insertId, ...newEvent });
    result(null, { id: res.insertId, ...newEvent });
  });
};

// Update an event
Event.updateById = (id, event, result) => {
  const query =
    "UPDATE events SET event_name = ?, event_description = ?, date = ?, location = ?, team_id = ? WHERE id = ?";
  db.query(
    query,
    [event.event_name, event.event_description, event.date, event.location, event.team_id, id],
    (err, res) => {
      if (err) {
        console.error("Error updating event:", err);
        result(err, null);
        return;
      }
      if (res.affectedRows === 0) {
        // No rows updated
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("Event updated:", { id: id, ...event });
      result(null, { id: id, ...event });
    }
  );
};

// Delete an event
Event.remove = (id, result) => {
  const query = "DELETE FROM events WHERE id = ?";
  db.query(query, [id], (err, res) => {
    if (err) {
      console.error("Error deleting event:", err);
      result(err, null);
      return;
    }
    if (res.affectedRows === 0) {
      // No rows deleted
      result({ kind: "not_found" }, null);
      return;
    }
    console.log(`Event with id ${id} deleted.`);
    result(null, res);
  });
};

module.exports = Event;
